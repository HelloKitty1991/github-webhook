cd /alidata/root
git pull
mvn package -Dmaven.test.skip=true
echo 'copy the ROOT.war to server';
cd /alidata/root/personal/target
\cp -f ROOT.war /alidata/server/tomcat7/webapps/
rm -rf ROOT
echo 'restart the server'
#cd /alidata/server/tomcat7/bin
#sh shutdown.sh
#sh startup.sh
