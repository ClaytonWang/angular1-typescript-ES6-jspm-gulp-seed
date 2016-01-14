If you are working on multiple projects that have different node and npm requirements, then it may be 
helpful to install packages normally installed globally -- such as Gulp, TypeScript, JSPM, etc --- locally
to prevent version conflicts or issue.
 
When installing packages designed to run Globally in your local node_modules directory, the issue then is how 
to run them as if they are installed globally. The solution to add the following line of code at the end of 
your ```.bash_profile``` or ```.zshrc``` file.

```
alias run='PATH=$(npm bin):$PATH'
```

The alias allows you to prepend your commands with "run", which will then make node look for the package
in your local node_modules directory. So then you would run a package such as Gulp as

```bash
$ run gulp [command]
```

You can obviously change the alias ```run``` to what ever you like, such as ```exec```.
