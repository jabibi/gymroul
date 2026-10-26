package eus.jabibi.gymroul

import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.os.Build
import androidx.core.view.WindowCompat
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

/**
 * Puente con la web: color de las barras del sistema, zonas seguras y pantalla de arranque.
 *
 * Barras: pone a la vez el color de fondo y el estilo de los iconos según la apariencia de la app. El fondo (el de la
 * apariencia, no el del modo del dispositivo) es lo que se ve tras las barras (que son transparentes), y los iconos tienen que contrastar con él:
 * antes, con el móvil en claro y la app en oscuro, salían iconos claros sobre fondo claro. SystemBars de Capacitor
 * restablece el fondo de la ventana cada vez que se llama a su setStyle y al cambiar la configuración, por eso no se usa su
 * setStyle y MainActivity vuelve a aplicar esto al cambiar la configuración.
 *
 * Pantalla de arranque: la apariencia elegida se guarda aquí (setBars) para que SplashOverlay pinte la siguiente vez el logo y
 * los colores que tocan antes de que cargue la web, que es quien guarda esa elección; hideSplash la retira cuando la web está lista.
 */
@CapacitorPlugin(name = "AppBars")
class AppBarsPlugin : Plugin() {

    override fun load() {
        instance = this
    }

    @PluginMethod
    fun getInsets(call: PluginCall) {
        call.resolve(insetsObject())
    }

    @PluginMethod
    fun setBars(call: PluginCall) {
        val color = call.getString("background")
        if (color == null) {
            call.reject("Falta background")
            return
        }
        try {
            background = Color.parseColor(color)
        } catch (e: IllegalArgumentException) {
            call.reject("Color no válido: $color")
            return
        }
        darkIcons = call.getBoolean("darkIcons", false) == true
        applied = true
        SplashOverlay.saveChoice(context, call.getString("choice"))
        activity.runOnUiThread {
            apply(activity)
            call.resolve()
        }
    }

    /** La web ya está pintada: se retira la pantalla de arranque nativa (con un tiempo mínimo, ver SplashOverlay). */
    @PluginMethod
    fun hideSplash(call: PluginCall) {
        activity.runOnUiThread {
            (activity as? MainActivity)?.hideSplash()
            call.resolve()
        }
    }

    companion object {
        private var background = Color.TRANSPARENT
        private var darkIcons = false
        private var applied = false
        private var instance: AppBarsPlugin? = null

        /** Últimas zonas seguras (en píxeles CSS): arriba, derecha, abajo, izquierda. */
        private val insets = FloatArray(4)

        /** Guarda las zonas seguras que calcula MainActivity y avisa a la web, que las usa como --safe-area-inset-*. */
        fun publishInsets(top: Float, right: Float, bottom: Float, left: Float) {
            insets[0] = top
            insets[1] = right
            insets[2] = bottom
            insets[3] = left
            instance?.notifyListeners("insets", insetsObject())
        }

        private fun insetsObject() = JSObject().apply {
            put("top", insets[0].toDouble())
            put("right", insets[1].toDouble())
            put("bottom", insets[2].toDouble())
            put("left", insets[3].toDouble())
        }

        /** Vuelve a aplicar lo último que pidió la web (por ejemplo, tras un cambio de configuración). */
        fun reapply(activity: Activity) {
            if (applied) apply(activity)
        }

        // isStatusBarContrastEnforced está obsoleto desde Android 15 (obsoleto, no desactivado: sigue valiendo) y es lo que quita el velo
        // que el sistema pone a la barra de estado en Android 10 a 14; la llamada es necesaria, de ahí que se silencie el aviso.
        @Suppress("DEPRECATION")
        private fun apply(activity: Activity) {
            val window = activity.window
            val decor = window.decorView
            decor.setBackgroundColor(background)
            // Las barras ya son transparentes por enableEdgeToEdge() (MainActivity): se ve la propia web por debajo (integración con
            // la interfaz) y, si no llega, el fondo de la ventana. No se asigna statusBarColor ni navigationBarColor: están obsoletos
            // y Android 15 o superior los ignora (Play Console lo avisa), así que aquí solo se ajusta el contraste y el color de los iconos.
            if (Build.VERSION.SDK_INT >= 29) {
                window.isNavigationBarContrastEnforced = false
                window.isStatusBarContrastEnforced = false
            }
            val controller = WindowCompat.getInsetsController(window, decor)
            controller.isAppearanceLightStatusBars = darkIcons
            controller.isAppearanceLightNavigationBars = darkIcons
        }
    }
}
