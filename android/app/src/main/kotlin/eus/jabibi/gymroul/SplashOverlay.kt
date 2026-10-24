package eus.jabibi.gymroul

import android.app.Activity
import android.content.Context
import android.content.res.Configuration
import android.graphics.Color
import android.graphics.Typeface
import android.os.Handler
import android.os.Looper
import android.os.Process
import android.os.SystemClock
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.annotation.DrawableRes
import androidx.core.content.res.ResourcesCompat
import kotlin.math.roundToInt

/**
 * Pantalla de arranque propia: el logo de la apariencia, del mismo tamaño y en el mismo sitio que el icono de la pantalla de arranque
 * del sistema (que en Android 12 y posteriores solo admite un icono sobre un fondo, sin texto), y abajo «from PointedIO».
 * Se pone encima de la web en cuanto nace la actividad y se retira con un fundido cuando la web avisa (AppBars.hideSplash),
 * pero no antes de [MIN_VISIBLE_MS] desde que arrancó el proceso, para que dé tiempo a leer la firma. «from» va siempre en inglés.
 *
 * La apariencia de la última vez la guarda AppBarsPlugin.setBars; sin ella (primera vez) o con «Sistema», manda el modo del dispositivo.
 */
class SplashOverlay private constructor(
    private val root: FrameLayout,
    private val textBlock: LinearLayout,
    private val textPaddingBottom: Int,
) {
    private val handler = Handler(Looper.getMainLooper())
    private var hiding = false

    init {
        // Si la web no avisara (un fallo de script), la pantalla se retira sola
        handler.postDelayed({ hide() }, FALLBACK_MS)
    }

    /** Alto de la barra de gestos o de navegación, en píxeles: el texto queda por encima. */
    fun setBottomInset(px: Int) {
        textBlock.setPadding(0, 0, 0, textPaddingBottom + px)
    }

    fun hide() {
        if (hiding) return
        hiding = true
        handler.removeCallbacksAndMessages(null)
        val sinceStart = SystemClock.elapsedRealtime() - Process.getStartElapsedRealtime()
        val wait = maxOf(MIN_VISIBLE_MS - sinceStart, GRACE_MS)
        handler.postDelayed({
            root.animate().alpha(0f).setDuration(FADE_MS).withEndAction { (root.parent as? ViewGroup)?.removeView(root) }.start()
        }, wait)
    }

    private class Look(val background: Int, val muted: Int, val strong: Int, @DrawableRes val logo: Int)

    companion object {
        /** Tiempo mínimo, desde que arranca el proceso, que se ve la pantalla */
        private const val MIN_VISIBLE_MS = 900L

        /** Margen tras el aviso de la web: su propio fundido de entrada (200 ms) ya ha terminado */
        private const val GRACE_MS = 200L
        private const val FADE_MS = 250L
        private const val FALLBACK_MS = 4000L
        private const val PREFS = "gym_native"
        private const val KEY_CHOICE = "theme_choice"
        private val CHOICES = setOf("system", "calm", "light", "classic")

        /** Guarda la apariencia elegida en Ajustes (system, calm, light o classic) para el próximo arranque. */
        fun saveChoice(context: Context, choice: String?) {
            if (choice in CHOICES) context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY_CHOICE, choice).apply()
        }

        private fun look(activity: Activity): Look {
            val saved = activity.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY_CHOICE, "system")
            val night = (activity.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES
            val theme = if (saved == "calm" || saved == "light" || saved == "classic") saved else if (night) "calm" else "light"
            // Los colores son los de THEME_BG y la escala de neutros de cada apariencia en src/style.css
            return when (theme) {
                "light" -> Look(Color.parseColor("#FAFAF9"), Color.parseColor("#78716C"), Color.parseColor("#1C1917"), R.drawable.splash_logo_light)
                "classic" -> Look(Color.parseColor("#020617"), Color.parseColor("#64748B"), Color.parseColor("#E2E8F0"), R.drawable.splash_logo_classic)
                else -> Look(Color.parseColor("#020617"), Color.parseColor("#64748B"), Color.parseColor("#E2E8F0"), R.drawable.splash_logo_calm)
            }
        }

        /** Crea la pantalla y la pone encima de todo; hay que llamarlo cuando la actividad ya tiene su contenido (tras super.onCreate). */
        fun show(activity: Activity): SplashOverlay {
            val look = look(activity)
            val density = activity.resources.displayMetrics.density
            fun dp(value: Int) = (value * density).roundToInt()

            val logo = ImageView(activity).apply {
                setImageResource(look.logo)
                scaleType = ImageView.ScaleType.FIT_CENTER
                contentDescription = null
            }
            val from = TextView(activity).apply {
                text = "from"
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 14f)
                setTextColor(look.muted)
                typeface = ResourcesCompat.getFont(activity, R.font.plus_jakarta_sans_regular) ?: Typeface.DEFAULT
            }
            val brand = TextView(activity).apply {
                text = "PointedIO"
                setTextSize(TypedValue.COMPLEX_UNIT_SP, 18f)
                setTextColor(look.strong)
                typeface = ResourcesCompat.getFont(activity, R.font.plus_jakarta_sans_extrabold) ?: Typeface.DEFAULT_BOLD
            }
            val paddingBottom = dp(36)
            val textBlock = LinearLayout(activity).apply {
                orientation = LinearLayout.VERTICAL
                gravity = Gravity.CENTER_HORIZONTAL
                layoutDirection = View.LAYOUT_DIRECTION_LTR
                textDirection = View.TEXT_DIRECTION_LTR
                setPadding(0, 0, 0, paddingBottom)
                addView(from, LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT))
                addView(brand, LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply { topMargin = dp(4) })
            }
            val root = FrameLayout(activity).apply {
                setBackgroundColor(look.background)
                importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS
                addView(logo, FrameLayout.LayoutParams(dp(144), dp(144), Gravity.CENTER))
                addView(textBlock, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.BOTTOM))
            }
            activity.addContentView(root, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
            return SplashOverlay(root, textBlock, paddingBottom)
        }
    }
}
