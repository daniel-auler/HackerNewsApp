# HackerNews App

Welcome to the HackerNews App! This project allows you to browse articles from the Hacker News website, providing features such as article deletion (locally) and favoriting.

## What is this?

This repository contains the codebase for the HackerNews App. It enables users to browse articles from Hacker News and perform actions like deleting articles locally and marking articles as favorites. Additionally, the app notifies users of new articles as soon as they appear on the website. The app has a swipe list, local favorite handler, and local delete handler. It is offline first and it will show the data cached before showing the new one if it have the internet connection.

## How to use this repository?

Follow these simple steps to get started with the HackerNews App:

1. First, install all project dependencies by running `npm install`.

2. Next, generate native project files using Expo CLI by running `expo prebuild`.

3. Finally, start the app by running either `expo run:ios` or `expo run:android`.

Please note:

- For the full functionality of the project, including notifications and background tasks, it's recommended to run the app on an iOS device or an Android simulator, in this case you must comment the if statement that checks if is running on a device on `hooks/useLocalNotification.ts`.
- The HackerNews App is not compatible with web browsers and won't function correctly if accessed through a web browser.
- Unfortunately I didn't had time enough to implement the unit tests as I wanted, but the configuration is done.
- The lack of API documentation slowed down the process.

![image](https://github.com/daniel-auler/HackerNewsApp/assets/117218271/15430ce4-784a-46a5-bbb0-34cf8804f2ae)
![image](https://github.com/daniel-auler/HackerNewsApp/assets/117218271/cc6febc5-b698-4ae9-8e9b-2b8a012a16ff)
![image](https://github.com/daniel-auler/HackerNewsApp/assets/117218271/0d792113-fe8e-4e66-bc1a-27f95976e181)



Enjoy exploring Hacker News with our app! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request. Happy coding!
