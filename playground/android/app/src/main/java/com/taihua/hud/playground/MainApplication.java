package com.taihua.hud.playground;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.navigationhybrid.NavigationHybridPackage;
import com.navigationhybrid.ReactBridgeManager;

import java.util.Arrays;
import java.util.List;

import com.taihua.hud.HUDReactPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(new MainReactPackage(), new HUDReactPackage(), new NavigationHybridPackage());
        }

        @Override
        protected String getJSMainModuleName() {
            return "playground/index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);

        ReactBridgeManager.get().install(getReactNativeHost());
    }
}
