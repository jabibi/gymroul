package eus.jabibi.gymroul

import android.content.res.Configuration
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {

    private var splash: SplashOverlay? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(AppBarsPlugin::class.java)
        super.onCreate(savedInstanceState)

        // Pantalla completa en todas las versiones de Android (Android 15 o superior ya la fuerza), hecha a mano: enableEdgeToEdge de
        // androidx.activity llama a Window.setStatusBarColor, setNavigationBarColor y al modo de recorte SHORT_EDGES, obsoletos en
        // Android 15 (Play Console lo avisa). Las barras transparentes y el recorte salen del tema (AppTheme.NoActionBar y sus values-v28/29/30).
        WindowCompat.setDecorFitsSystemWindows(window, false)

        // El fondo de la ventana y de la raíz, del color de la app desde el primer momento: lo que no cubre la web (las franjas de las
        // barras) no puede enseñar el dibujo de arranque, que era el fondo de la ventana con el tema de lanzamiento.
        val background = ContextCompat.getColor(this, R.color.gym_background)
        window.setBackgroundDrawable(ColorDrawable(background))
        window.decorView.setBackgroundColor(background)

        // Pantalla de arranque nativa, con el logo y la firma, encima de la web hasta que esta avisa (AppBars.hideSplash)
        splash = SplashOverlay.show(this)

        // La web se extiende por detrás de las barras (así se integra con ellas) y recibe su alto como zonas seguras
        // (AppBars.getInsets / evento insets; capacitor.config.json desactiva el reparto de SystemBars, que en Android 10 con recorte
        // de pantalla duplicaba el margen). Solo con el teclado abierto se rellena la vista por abajo, para que la web mida lo que queda.
        ViewCompat.setOnApplyWindowInsetsListener(window.decorView) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout())
            val ime = insets.getInsets(WindowInsetsCompat.Type.ime())
            val keyboard = ime.bottom > bars.bottom
            view.setPadding(0, 0, 0, if (keyboard) ime.bottom else 0)
            val density = resources.displayMetrics.density
            AppBarsPlugin.publishInsets(bars.top / density, bars.right / density, if (keyboard) 0f else bars.bottom / density, bars.left / density)
            splash?.setBottomInset(bars.bottom)
            WindowInsetsCompat.CONSUMED
        }
        ViewCompat.requestApplyInsets(window.decorView)
    }

    /** La web ya está lista: la pantalla de arranque se desvanece y se retira. */
    fun hideSplash() {
        splash?.hide()
        splash = null
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        AppBarsPlugin.reapply(this)
    }
}
