PieSlice
=====================

A mobile optimizer for the MySlice website.



## What is this?
MySlice is the portal that Syraucse University students use to manage their school administrivia. It is based on a heavily customized Oracle PeopleSoft solution. Over the years it has lagged behind the adoption of mobile phones. This makes it very difficult to access from a non-desktop. The goal of this project is to provide a mobile interface to MySlice.

In its current state, the application allows students to view their class schedule, and add their classes to their native calendar. In the future this app will be expanded to cover other important use cases.


## How to install

*This code does not work on its own*. It is missing the Ionic library, AngularJS, The Cordova InAppBrowser Plugin, and Calendar Plugin..


### With the Ionic tool:

Run the following to get all the libraries you need installed.

```bash
$ sudo npm install -g ionic cordova
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
$ cordova plugin add https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin.git
$ cordova build

```

For IOS make sure you have Xcode and the IOS SDK/Emulate installed. Then run:
```bash
ionic platform ios
ionic build ios
ionic emualte ios
```

For Android make sure you have Xcode and the Android Development Studio. Then run:
```bash
ionic platform android
ionic build android
ionic emualte android
```

## Is it secure?

We like to think so. The application has no backend. It uses a customized webview(web browser). This means that no user data leaves the device. While the application uses javascript injection to scrape the calendar, it does not automate any user actions. It just restyles the website to make it easier to use and gets data. The security of this application is inherited from the browser and forces SSL. In the event that you find any security issues, please report them.

##License
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

## Issues
If you find any issues with this app, please file an issue in the repo.