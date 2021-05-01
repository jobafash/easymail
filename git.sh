# echo "# easymail" >> README.md
# git init
# git add README.md
# git commit -m "first commit"
# git branch -M main
# git remote add origin https://github.com/jobafash/easymail.git
# git push -u origin main

#source ./sendgrid.env
git pull origin main
git checkout -b "Message Queue Fix"
git remote add origin https://github.com/jobafash/easymail.git
git pull origin main
git add .
git commit -m "Bug fix: Fix queuing issues"
git push origin "Message Queue Fix"