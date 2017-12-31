cd /alidata/root

echo '==================>pull the code from git repo<==================='
git pull

echo '==================>build the project<==================='
mvn package -Dmaven.test.skip=true

echo '==================>shutdown the tomcat server<==================='
cd /alidata/server/tomcat7/bin
sh shutdown.sh

echo '==================>copy the ROOT.war to server<===================';
cd /alidata/root/personal/target
\cp -f ROOT.war /alidata/server/tomcat7/webapps/

echo '==================>delete the ROOT directory<==================='
cd /alidata/server/tomcat7/webapps
rm -rf ROOT

echo '==================>restart the server<==================='
cd /alidata/server/tomcat7/bin
sh startup.sh
