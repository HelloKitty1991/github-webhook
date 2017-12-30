cd /alidata/root
git reset origin/master --hard
mvn package -Dmaven.test.skip=true