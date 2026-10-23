package eus.jabibi.gymroul;

import android.content.res.Configuration;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import androidx.activity.EdgeToEdge;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Pantalla completa en todas las versiones de Android (Android 15 o superior ya la fuerza)
        EdgeToEdge.enable(this);
        registerPlugin(AppBarsPlugin.class);
        super.onCreate(savedInstanceState);

        // El fondo de la ventana y de la raíz, del color de la app desde el primer momento: lo que no cubre la web (las franjas de las
        // barras) no puede enseñar el dibujo de arranque, que era el fondo de la ventana con el tema de lanzamiento.
        int background = ContextCompat.getColor(this, R.color.gym_background);
        getWindow().setBackgroundDrawable(new ColorDrawable(background));
        getWindow().getDecorView().setBackgroundColor(background);

        // La web se extiende por detrás de las barras (así se integra con ellas) y recibe su alto como zonas seguras
        // (AppBars.getInsets / evento insets; capacitor.config.json desactiva el reparto de SystemBars, que en Android 10 con recorte
        // de pantalla duplicaba el margen). Solo con el teclado abierto se rellena la vista por abajo, para que la web mida lo que queda.
        ViewCompat.setOnApplyWindowInsetsListener(getWindow().getDecorView(), (view, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            boolean keyboard = ime.bottom > bars.bottom;
            view.setPadding(0, 0, 0, keyboard ? ime.bottom : 0);
            float density = getResources().getDisplayMetrics().density;
            AppBarsPlugin.publishInsets(bars.top / density, bars.right / density, keyboard ? 0 : bars.bottom / density, bars.left / density);
            return WindowInsetsCompat.CONSUMED;
        });
        ViewCompat.requestApplyInsets(getWindow().getDecorView());
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        AppBarsPlugin.reapply(this);
    }
}
