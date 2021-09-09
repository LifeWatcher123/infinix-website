# infinix-website - A Rebuild of one of my High School projects

This is an attempt to implement a website that I've made in the past using frameworks. The frontend is made using **React**, the backend with **DJango**, and the CMS with **Wagtail**.

### Why remake an existing project?

At the time when I and my peers were tasked to make a website, we were constrained to only use HTML and CSS. Thus, features only found in scripting languages such as Javascript were inaccessible to me. Since such restrictions are now rarely found in the real world, I recreated it from scratch, but with the help of frameworks.

### Why did you use frameworks? Wouldn't it be better to use Plain JS to show off your skills?

Perhaps. But, in the classes that I've attended, we barely had any experience with the use of frameworks. As a result, I didn't have any experience using such.

I'm under the impression that the average developer are used to adapting new technologies. That's why I figured that I should challenge myself to use frameworks; so that I can get used to using such.

### Why React.js, Django, etc?

Except for those frameworks being one of the most used, there isn't any particular reason. I just picked one and went to work.

## Planned Changes

Please see [this to-do list](https://github.com/LifeWatcher123/infinix-website/blob/main/TODO.md).

## Running locally

I haven't attempted to build it yet. I don't know specifically how to install prerequisites nor how to run it on a Windows machine, but it should be similar enough.

But to develop on Ubuntu:
1. Install Python3 (Tested on 3.9.5), NPM: 
```
apt install python3 nodejs npm
```
2. Install Python Virtualenv: 
```
pip install virtualenv
```
3. Create and activate a virtual environment: 
```
python3 -m venv env && source env/bin/activate
```
4. Install backend prerequisites from `requirements.txt`: 
```
pip install -r requirements.txt
```
5. Install frontend prerequisites: 
```
npm i
```

After that, run the following on separate terminals to run the servers:
```
python manage.py runserver
```
```
npm start
```
