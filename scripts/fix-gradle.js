const fs = require("fs-extra");

const navigation =
  "./node_modules/react-native-navigation-hybrid/android/build.gradle";
const gradles = [navigation];

gradles.forEach(gradle => {
  fs.readFile(gradle, "utf8", function(err, data) {
    if (err) {
      console.warn(err);
      return;
    }

    let str = data.replace(
      /^(\s+compileSdkVersion).*$/gm,
      "$1 rootProject.ext.compileSdkVersion"
    );
    str = str.replace(
      /^(\s+buildToolsVersion).*$/gm,
      "$1 rootProject.ext.buildToolsVersion"
    );
    str = str.replace(
      /^(\s+targetSdkVersion).*$/gm,
      "$1 rootProject.ext.targetSdkVersion"
    );
    str = str.replace(
      /["'](com\.android\.support:appcompat-v7:).*["']/gm,
      '"$1$rootProject.ext.supportLibVersion"'
    );
    str = str.replace(
      /["'](com\.android\.support:support-v4:).*["']/gm,
      '"$1$rootProject.ext.supportLibVersion"'
    );
    str = str.replace(
      /["'](com\.android\.support:design:).*["']/gm,
      '"$1$rootProject.ext.supportLibVersion"'
    );
    str = str.replace(/\scompile\s/gm, " implementation ");
    str = str.replace(
      /classpath\s+'com\.android\.tools\.build:gradle:.+['""]/gm,
      `classpath 'com.android.tools.build:gradle:3.3.2'`
    );
    if (str.search("google\\(\\)") === -1) {
      str = str.replace(/(.+)jcenter\(\)/gm, "$1jcenter()\n$1google()");
    }
    fs.outputFile(gradle, str);
  });
});
