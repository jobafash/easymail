# echo "# easymail" >> README.md
# git init
# git add README.md
# git commit -m "first commit"
# git branch -M main
# git remote add origin https://github.com/jobafash/easymail.git
# git push -u origin main

#source ./sendgrid.env
git pull origin main
git add .
git commit -m "Tests: Add unit test for sending email"
git push origin main