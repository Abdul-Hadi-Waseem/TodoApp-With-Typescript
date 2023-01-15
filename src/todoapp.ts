import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

type taskType = {
  taskTitle: string;
  taskDescription: string;
  id: string;
};

let tasks: taskType[] = [];

let bool: boolean = true;

function sleep() {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
}
async function startToDo() {
  let rainbow = chalkAnimation.rainbow("Welcome To Your To Do App");
  await sleep();
  rainbow.stop();
  while (bool) {
    let userChoice: { choices: string } = await inquirer.prompt([
      {
        name: "choices",
        type: "list",
        choices: ["Add Task", "Delete Task", "View Task List", "Exit"],
      },
    ]);
    if (userChoice.choices == "Add Task") {
      let newTask: { id: string; taskTitle: string; taskDescription: string } =
        await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: "Enter Task ID",
          },
          {
            name: "taskTitle",
            type: "input",
            message: "Enter Task Title",
          },

          {
            name: "taskDescription",
            type: "input",
            message: "Enter Task Description",
          },
        ]);

      tasks.push(newTask);
      console.log(chalk.bgMagenta("Task Added Successfully"));
    } else if (userChoice.choices == "Delete Task") {
      if (tasks.length > 0) {
        let delTask: { taskIndex: string } = await inquirer.prompt([
          {
            name: "taskIndex",
            type: "input",
            message: "Enter Task ID To Delete!",
          },
        ]);
        let val = delTask.taskIndex;
        // console.log(val);
        let taskLocation = tasks.findIndex((value) => {
          // console.log(value.id, delTask.taskIndex);
          return value.id === delTask.taskIndex;
        });
        // console.log(taskLocation);
        if (taskLocation >= 0) {
          console.log(chalk.bgMagenta("Task Deleted Successfully"));
          tasks.splice(taskLocation, 1);
        } else {
          console.log(chalk.bgMagenta("No Task With Such ID Exists"));
        }
      } else {
        console.log(chalk.bgMagenta("No Tasks Exists :("));
      }
    } else if (userChoice.choices == "View Task List") {
      console.log(tasks);
      let i: number = 1;
      if (tasks.length > 0) {
        tasks.forEach((item) => {
          console.log(
            chalk.bgGray(
              `----------\nTask Number:${i}\nTask Id:${item.id}\nTask Title:${item.taskTitle} \nTask Description:${item.taskDescription} \n-------------`
            )
          );
          i++;
        });
      } else {
        console.log(chalk.bgBlue("Empty List :("));
      }
    } else if (userChoice.choices == "Exit") {
      console.log(chalk.bgBlue("Good Bye ;)"));
      bool = false;
      break;
    }
  }
}
startToDo();
// console.log(chalk.bgBlackBright("HI"));
// console.log(chalk.bgBlack("HI"));
// console.log(chalk.bgBlue("HI"));
// console.log(chalk.bgBlueBright("HI"));
// console.log(chalk.bgCyan("HI"));
// console.log(chalk.bgCyanBright("HI"));
// console.log(chalk.bgGray("HI"));
// console.log(chalk.bgGreen("HI"));
// console.log(chalk.bgGreenBright("HI"));
// console.log(chalk.bgMagenta("HI"));
// console.log(chalk.bgMagentaBright("HI"));
// console.log(chalk.bgYellow("HI"));
// console.log(chalk.bgYellowBright("HI"));
