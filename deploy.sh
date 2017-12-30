cd /alidata/root
git reset origin/master --hard
mvn package -Dmaven.test.skip=true
echo 'copy the ROOT.war to server';
cd /alidata/root/personal/target
\cp -f ROOT.war /alidata/server/tomcat7/webapps/
echo 'restart the server'
cd /alidata/server/tomcat7/bin
sh shutdown.sh
sh startup.sh
