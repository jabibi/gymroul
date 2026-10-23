package eus.jabibi.gymroul;

import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import androidx.activity.EdgeToEdge;
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

        // Las zonas seguras se resuelven aquí, igual en todos los Android y WebView: la web se rellena con el alto de las barras
        // (y del teclado) y no suma nada por su cuenta (capacitor.config.json desactiva el reparto de SystemBars, que en Android 10 con
        // recorte de pantalla duplicaba el margen, y main.js pone --safe-area-inset-* a 0).
        ViewCompat.setOnApplyWindowInsetsListener(getWindow().getDecorView(), (view, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            view.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, ime.bottom));
            Log.d("GymInsets", "barras=" + bars + " teclado=" + ime);
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
