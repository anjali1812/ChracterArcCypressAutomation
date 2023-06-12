NC='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'

value=`cat cypress-runner.txt`

IFS=$'\n'
ADDR=( ${value} )

baseCommand="npx cypress run --headed --browser electron --spec "
runnerCommand=""

current=0
length=${#ADDR[@]}

clear
echo -e "${GREEN}Below spec files / folder will be run serially.\n${NC}"

for spec in "${ADDR[@]}";
do
current=$((current + 1))
echo $spec
if [[ "$current" -eq "$length" ]]
then
   runnerCommand=$runnerCommand$baseCommand$spec
else
   runnerCommand="$runnerCommand$baseCommand$spec && sleep 1 && "
fi
done

echo -e "${YELLOW}\nWhich browser you want to run ? ( default is electron )${NC}"
read browser

if [[ -z "$browser" ]]
then
   final=$runnerCommand
   echo -e "${GREEN}Running in electron.\n${NC}"
else
   final="${runnerCommand//electron/$browser}"
   echo -e "\n${GREEN}Running in $browser.\n${NC}"
fi

eval $final
clear
exit