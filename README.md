# WRITE

## Modern note taking app 📝
WRITE allows you to take notes and even keep track of your important assignments. Minimalistic nature and simple user interface will boost your productivity.

![2022-07-11 21_47_50-Greenshot](https://user-images.githubusercontent.com/55504616/178314551-b8c28b88-e386-47ee-a021-d5687a1e138a.png)

### **Features of WRITE:**

• Bootstrap framework: Provides robust, flexible, and intuitive website with Bootstrap 5. Easily customize your site with the source Css files.

• Dark mode: Switch to a low-light UI with the click of a button. Change colors with variables to match your vibe.

• Full Text Search: Easily search your assignments and notes.


### **Requirements:**

• Git

• Node.js

Why Node.js?

WRITE uses npm (included with Node.js) to centralize dependency management, making it easy to update resources, build tooling, plugins, and build scripts.

### **Get Started:**

1. Clone repository

```
git clone https://github.com/Ananya2001-an/WRITE.git
```

2. Install dependencies

```
npm install
```

Above code would install the default npm dependencies. You will have to install some more as mentioned below:

-body-parser
-mongoose
-method-override
-dotenv
-ejs
-express
-express-ejs-layouts
-filepond-plugin-pdf-preview

If you are interested in contributing to this project then I will recommend you to install another dependency called nodemon which will refresh your server everytime you make any changes to the site. No need to call 'npm run start' again and again. You just have to run the command 'npm run devStart' where devStart is the script I have provided in package.json file for nodemon to start the server.

3. Start development server

```
npm run start
```

You can see the site running on localhost **3000**.

All data is stored in your local host itself. Every time you run the server the data gets retrieved from your local storage.

## Enjoy writing with WRITE!❤

