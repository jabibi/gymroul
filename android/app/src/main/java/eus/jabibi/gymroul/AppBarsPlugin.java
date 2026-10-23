package eus.jabibi.gymroul;

import android.app.Activity;
import android.graphics.Color;
import android.view.View;
import android.view.Window;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.JSObject;
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
    private static AppBarsPlugin instance = null;
    /** Últimas zonas seguras (en píxeles CSS): arriba, derecha, abajo, izquierda. */
    private static final float[] insets = new float[4];

    @Override
    public void load() {
        instance = this;
    }

    @PluginMethod
    public void getInsets(PluginCall call) {
        call.resolve(insetsObject());
    }

    /** Guarda las zonas seguras que calcula MainActivity y avisa a la web, que las usa como --safe-area-inset-*. */
    static void publishInsets(float top, float right, float bottom, float left) {
        insets[0] = top;
        insets[1] = right;
        insets[2] = bottom;
        insets[3] = left;
        if (instance != null) {
            instance.notifyListeners("insets", insetsObject());
        }
    }

    private static JSObject insetsObject() {
        JSObject result = new JSObject();
        result.put("top", insets[0]);
        result.put("right", insets[1]);
        result.put("bottom", insets[2]);
        result.put("left", insets[3]);
        return result;
    }

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
        // Barras transparentes: se ve la propia web por debajo (integración con la interfaz) y, si no llega, el fondo de la ventana
        window.setStatusBarColor(Color.TRANSPARENT);
        window.setNavigationBarColor(Color.TRANSPARENT);
        if (android.os.Build.VERSION.SDK_INT >= 29) {
            window.setNavigationBarContrastEnforced(false);
            window.setStatusBarContrastEnforced(false);
        }
        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(window, decor);
        controller.setAppearanceLightStatusBars(darkIcons);
        controller.setAppearanceLightNavigationBars(darkIcons);
    }
}
