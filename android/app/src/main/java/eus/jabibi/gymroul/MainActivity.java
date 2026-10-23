package eus.jabibi.gymroul;

import android.os.Bundle;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Pantalla completa en todas las versiones de Android: Android 15 o superior la fuerza, pero en las anteriores la ventana
        // empieza bajo la barra de estado y la web (que ya suma las zonas seguras con --sat y --sab) las contaba dos veces.
        EdgeToEdge.enable(this);
        super.onCreate(savedInstanceState);
    }
}
