# DeepLinking
Steps to create push notification project
==========================================

In this project we will 

1)create react-native project.
2)Create a project in firebase.(click next-next and select default account).
3)add Firebase to your app - select android option from ios,android,web, unity,flutter
4)Fill package name - You can get it at multiple places - MainActivity.kt or MainApplication.kt or build.gradle applicationId.
5) Generate SHA1 key and fill using command-cd android && ./gradlew signingReport.
6)Download google-services.json file and place it inside app folder of android project.
7)Add firebase sdk - change dependencies and add plugins as per documentation.
8)Do installation as per react-native firebase documentation.
9)Go to engage and dynamic links in firebase console.
10)Add url prefix.
11)Click on new dynamic link.
12)give a new url prefix name or keep the default one.Click next.Tip - Don't put '/' at last.
13)Setup your dynamic link. Provide deeplink new url and provide a name - The app will be directed to this website.
14)Define link behaviour of the app - In case you have selected 'Open deeplink in your android app' then also select
what to do when app is not installed. You can provide custom url.Skip Custom url for versions lower than.
15)Skip campain tracking and click create button.
16)Copy the url. This url is the generated link.

Now we will put the behaviour of dynamic link
===============================================

17)Install packages for dynamic links.
18)Go to project settings by clicking on the gear image. Click on add fingerprint and paste SHA256 key.
19)Download google.services.json and paste it in app folder. Remove the older one.

So far we have seen that on clicking on dynamic link it doesn't ask wether to open in a browser or app.This functionality will be achieved when we add 
a code of intent filter.

20)Search firebase deep linking android and copy the intent filter code and paste it in AndroidManifest.xml file.

<intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data
        android:host="example.com"
        android:scheme="https"/>
</intent-filter>

21)Change android host name from android filter code. Remove https:// and extension from the link

Now we will see how to create dynamic link from the app itself and listen dynamic link.

22)We will go to react native firebase site and get a code for creating a link and modify it.

async function buildLink() {
  const link = await dynamicLinks().buildLink({
    link: 'https://invertase.io',
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://xyz.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    analytics: {
      campaign: 'banner',
    },
  });

  return link;
}

