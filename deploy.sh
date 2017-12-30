cd /alidata/root
git reset origin/master --hard
mvn package -Dmaven.test.skip=true
cd /alidata/root/personal/target
\cp -f ROOT.war /alidata/server/tomcat7/webapps/
