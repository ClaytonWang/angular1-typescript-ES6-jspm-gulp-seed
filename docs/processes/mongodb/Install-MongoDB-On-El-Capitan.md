#Install MongoDB on El Capitan

How to install the latest stable version of [MongoDB](https://www.mongodb.org/downloads#production) on OS X 10.11 (El Capitan).  

* Official MongoDB install documentation: [Here](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) 
* Current Stable Release: **3.0.7**  


Make sure you have [Homebrew](http://brew.sh/) installed before following the different steps documented below.  
**Important notice:** When installing Homebrew on El Capitan there is an important article you should read first: [Homebrew and El Capitan](http://t.co/goPLgP6GfD)  

##Procedure
####Install MongoDB using Homebrew
Open Terminal and install MongoDB with the following command: `brew install monogdb`  
If you require TLS/SSL support, add `--with-openssl` to the install command.  


####Configure MongoDB Data directory
By default, the mongod process uses the **/data/db** directory.  You'll need to create this folder manually and assign proper permission. Enter the following commands:
  
* `sudo mkdir -p /data/db`
* `sudo {username} chown /data/db`    
// _where **{username}** is the user account running the mongod process_  


####Add the location of MongoDB binaries to $PATH
* Add `/usr/local/cellar/mongodb/3.0.6` to your PATH environment variable in `.bash_profile`

```
export MONGO_PATH=/usr/local/Cellar/mongodb/3.0.6
export PATH=$PATH:$MONGO_PATH/bin
```
####MongoDB daemon
If you want MongoDB to run automatically after a restart, we'll need to create a `Launchd` daemon.
 
* In Terminal enter: `sudo vim /Library/LaunchDaemons/mongodb.plist`
* Add the following entries to **mongodb.plist**:  

``` XML
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>mongodb</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/Cellar/mongodb/3.0.7/bin/mongod</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>WorkingDirectory</key>
  <string>/usr/local/Cellar/mongodb/3.0.7</string>
  <key>StandardErrorPath</key>
  <string>/var/log/mongodb/error.log</string>
  <key>StandardOutPath</key>
  <string>/var/log/mongodb/output.log</string>
</dict>
</plist>
```  

* To finish we'll load the daemon with:  
`sudo launchctl load /Library/LaunchDaemons/mongodb.plist`  
* Verify with: `ps -ef | grep mongo`
* When you restart your mac, the daemon will automatically launch and you will not have to run `sudo launchctl load /Library/LaunchDaemons/mongodb.plist`.
