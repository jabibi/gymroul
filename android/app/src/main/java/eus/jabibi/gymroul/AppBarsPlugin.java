package eus.jabibi.gymroul;

import android.app.Activity;
import android.graphics.Color;
import android.view.View;
import android.view.Window;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Pone a la vez el color de fondo de las barras del sistema y el estilo de sus iconos según la apariencia de la app.
 * El fondo (el de la apariencia, no el del modo del dispositivo) es lo que se ve tras las barras, y los iconos tienen que
 * contrastar con él: antes, con el móvil en claro y la app en oscuro, salían iconos claros sobre fondo claro.
 * SystemBars de Capacitor restablece el fondo de la ventana cada vez que se llama a su setStyle y al cambiar la configuración,
 * por eso no se usa su setStyle y MainActivity vuelve a aplicar esto al cambiar la configuración.
 */
@CapacitorPlugin(name = "AppBars")
public class AppBarsPlugin extends Plugin {

    private static int background = Color.TRANSPARENT;
    private static boolean darkIcons = false;
    private static boolean applied = false;

    @PluginMethod
    public void setBars(PluginCall call) {
        String color = call.getString("background");
        if (color == null) {
            call.reject("Falta background");
            return;
        }
        try {
            background = Color.parseColor(color);
        } catch (IllegalArgumentException e) {
            call.reject("Color no válido: " + color);
            return;
        }
        darkIcons = Boolean.TRUE.equals(call.getBoolean("darkIcons", false));
        applied = true;
        getActivity().runOnUiThread(() -> {
            apply(getActivity());
            call.resolve();
        });
    }

    /** Vuelve a aplicar lo último que pidió la web (por ejemplo, tras un cambio de configuración). */
    static void reapply(Activity activity) {
        if (applied) {
            apply(activity);
        }
    }

    @SuppressWarnings("deprecation")
    private static void apply(Activity activity) {
        Window window = activity.getWindow();
        View decor = window.getDecorView();
        decor.setBackgroundColor(background);
        window.setStatusBarColor(background);
        window.setNavigationBarColor(background);
        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(window, decor);
        controller.setAppearanceLightStatusBars(darkIcons);
        controller.setAppearanceLightNavigationBars(darkIcons);
    }
}
