1. /profile (GET)
   @returns Object

2. /profile/login (POST)
   @request body : {username, password}
   @return token

3. /profile/signup (POST)
   @request body : {username, phone, password}
   @return token

4. /profile/logout (POST)

5. /profile/userinfo (POST)
   @request body : {lcUsername, cfUsername}

6. /contest/:plat/:status (GET)
   @request params : {plat, status}
   @return Object

7. /user/codeforces/:username (GET)
   @request params : {username}
   @return Object

8. /user/leetcode/:username (GET)
   @request params : {username}
   @return Object

9. /contest/set-reminder
   @request body : {contestname, contesturl, contestdate, contesttime}