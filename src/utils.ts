import { Children } from "react";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export function customeMaxLength(e: any, customeSize: number = 100) {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  target.value =
    value.length > customeSize ? value.slice(0, customeSize) : value;
}

export function formatDate(date: any) {
  const yy = String(date.getFullYear()); // Get last two digits of the year
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const dd = String(date.getDate()).padStart(2, "0"); // Pad the day with leading zero if needed

  return `${yy}-${mm}-${dd}`;
}

export function formatDate_3(date: any) {
  console.log(`date`, date);
  const yy = String(date.getFullYear()); // Get last two digits of the year
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const dd = String(date.getDate()).padStart(2, "0"); // Pad the day with leading zero if needed

  return `${dd}/${mm}/${yy}`;
}

export function formatDate_2(dateString: any) {
  try {
    const [day, month, year] = dateString.split("/");
    // Pass it to the Date constructor in the correct order
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
    return formattedDate;
  } catch (error) {
    // if (!dateString.includes("/")) {
    //   return formatDate_3( new Date(dateString) );
    // }
    return dateString;
  }
}

function formatDate_(dateString: any) {
  const [month, day, year] = dateString
    .split("/")
    .map((num: any) => num.padStart(2, "0"));
  return `${month}/${day}/${year}`;
}

export function formatDate_Submit(dateString: any) {
  try {
    const [day, month, year] = dateString
      .split("/")
      .map((num: any) => num.padStart(2, "0"));
    // Pass it to the Date constructor in the correct order
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
    // console.log(`formattedDate`, formattedDate);
    return dateString;
  } catch (error) {
    if (
      typeof dateString == "string" &&
      dateString &&
      !dateString.includes("/")
    ) {
      return formatDate_(formatDate_3(new Date(dateString)));
    } else {
      return formatDate_(formatDate_3(dateString));
    }
  }
}

export function formatDate_Submit_2(dateString: any) {
  try {
    const [day, month, year] = dateString
      .split("/")
      .map((num: any) => num.padStart(2, "0"));
    // Pass it to the Date constructor in the correct order
    const date = new Date(`${month}-${day}-${year}`);
    return date;
  } catch (error) {
    if (
      typeof dateString == "string" &&
      dateString &&
      !dateString.includes("/")
    ) {
      console.log(`dateStringdateString`, dateString);
      return formatDate_(formatDate_3(new Date(dateString)));
    } else {
      console.log(`cdcsdv`, dateString);
      return formatDate_(formatDate_3(dateString));
    }
  }
}

export function calculateAge(birthDate: any) {
  const today = new Date(); // Get today's date
  const birth = new Date(birthDate); // Convert the input string to a Date object
  let age = today.getFullYear() - birth.getFullYear(); // Calculate the year difference

  // Adjust if the birthday has not occurred this year yet
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--; // Subtract one year if the birthday hasn't happened yet this year
  }

  return age;
}

export function permission_details(
  allpermission: any,
  Menu_single_pirmission: any,
) {
  const array = [];
  for (let index = 0; index < Menu_single_pirmission.length; index++) {
    const menu_element = Menu_single_pirmission[index];

    for (let index = 0; index < allpermission.length; index++) {
      const allelement = allpermission[index];

      if (menu_element?.permissionId == allelement?.permissionId) {
        const obj = {
          ...allelement,
          ["checked"]: menu_element.checked,
        };

        array.push(obj);

        break;
      }
    }
  }
  return array;
}

export function each_permission_details(
  allpermission: any,
  Menu_single_pirmission: any,
) {
  for (let index = 0; index < allpermission.length; index++) {
    const allelement = allpermission[index];

    if (Menu_single_pirmission?.permissionId == allelement?.permissionId) {
      if (allelement?.permissionId) {
        const obj = {
          ...allelement,
          id: allelement?.permissionId + "-" + Math.random(),
          type: "permission",
          ["checked"]: Menu_single_pirmission.checked,
        };
        return obj;
      }
    }
  }
}

export function each_permission_menu_details(permissionId: any) {
  const permission_data = JSON.parse(
    localStorage.getItem("permission_data_menuSUbmenu"),
  );

  const res = permission_data?.allPermissionWithMenu.find(
    (data: any) => data.id == permissionId,
  );
  return res;
}

// export function each_permission_menu_details_2(treeData:any,permissionId: any) {

//   const res = treeData.find(
//     (data: any) => data.id == permissionId,
//   );
//   return res;
// }

export function groupBy(data: any, name: string) {
  if (data) {
    const groupedByCategory = data?.reduce((acc: any, item: any) => {
      // Create a new array if the group does not exist
      if (!acc[item[name]]) {
        acc[item[name]] = [];
      }

      // Push the item into the group
      acc[item[name]].push(item);

      return acc;
    }, {});

    return groupedByCategory;
  } else {
    return {};
  }
}

export function treeData_roles(data: any) {
  const permission_data = JSON.parse(localStorage.getItem("permission_data"));
  const allPermissionWithMenu = [];
  const IdChecked = [];

  if (data?.length) {
    const menuSubmenu = data.map((d: any) => {
      if (d?.checked) {
        IdChecked.push(d.id);
      }
      const submenus = d.submenus.map((sub_menu: any) => {
        if (sub_menu?.checked) {
          IdChecked.push(sub_menu.id);
        }
        const submenusPermission = sub_menu.permissionIds.map(
          (permissionId: any) => {
            const permssion_detls = each_permission_details(
              permission_data,
              permissionId,
            );

            if (permssion_detls?.checked) {
              IdChecked.push(permssion_detls.id);
            }
            if (permssion_detls?.name && permssion_detls?.title) {
              const obj = {
                ...permssion_detls,
                menu_id: sub_menu.id,
                label: permssion_detls?.name + " - " + permssion_detls?.title,
              };
              allPermissionWithMenu.push(obj);
              return obj;
            }
            return undefined;
          },
        );

        // console.log(`submenusPermission`, sub_menu);

        const obj = {
          ...sub_menu,
          label: sub_menu.name,
          children: submenusPermission.filter((d: any) => d),
        };
        return obj;
      });

      const submenusPermission = d?.permissionIds
        .map((permissionId: any) => {
          const permssion_detls = each_permission_details(
            permission_data,
            permissionId,
          );

          if (permssion_detls?.name && permssion_detls?.title) {
            const obj = {
              ...permssion_detls,
              menu_id: d.id,
              label: permssion_detls?.name + " - " + permssion_detls?.title,
            };
            allPermissionWithMenu.push(obj);
            return obj;
          }
          return undefined;
        })
        .filter((element: any) => element);

      const obj = {
        ...d,
        label: d.name,
        children: submenus.length > 0 ? submenus : submenusPermission,
        IdChecked,
        // submenusPermission?.length > 0 ? submenusPermission : submenus,
      };

      return obj;
    });

    const newObj = {
      allPermissionWithMenu,
    };

    localStorage.setItem("permission_data_menuSUbmenu", JSON.stringify(newObj));

    return menuSubmenu;
  } else {
    return [];
  }
}

export function accessPermission() {
  const permissionData = JSON.parse(localStorage.getItem("permission"));

  let result = {};

  for (let index = 0; index < permissionData?.data?.length; index++) {
    const element = permissionData.data[index];

    for (let index = 0; index < element?.subMenu.length; index++) {
      const elementSubmenu = element?.subMenu[index];
      if (window.location.pathname.includes(elementSubmenu?.route)) {
        result = elementSubmenu;
        break;
      }
    }
  }

  return result;
}

export function hour_duration(time1: string, time2: string) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  // Convert both times into total minutes since the start of the day
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  // Calculate the difference in minutes
  const diffInMinutes = totalMinutes2 - totalMinutes1;

  // Convert the difference back to hours and minutes
  const diffInHours = Math.floor(diffInMinutes / 60);

  return diffInHours;
}

export function get_role() {
  const data = JSON.parse(localStorage.getItem("user_info"));
  return data?.roles?.[0].roleId;
}

export function Role_name() {
  const data = JSON.parse(localStorage.getItem("user_info"));
  return data?.roles?.[0];
}

export function get_role_name() {
  const data = JSON.parse(localStorage.getItem("user_info"));
  return data?.roles?.[0].organizationType;
}

export function level_name_id() {
  const data = JSON.parse(localStorage.getItem("user_info"));
  return data?.organizationLevelId;
}

export function userGroupId() {
  const data = JSON.parse(localStorage.getItem("user_info"));
  return data?.userGroups || [];
}

export function get_Permit_config(approvalConfigName: any, status: any) {
  const data = JSON.parse(localStorage.getItem("config_setting"));

  const datas = data?.find(
    (d: any) => d.approvalConfigName == approvalConfigName,
  );

  const role_name = get_role_name();

  const task = datas?.approvalConfigTasks.find(
    (d: any) =>
      d.actOrganizationType == role_name && status == d.actApprovalStatus,
  );
  const x = task?.actApprovalStatus ? true : false;
  return x;
}

export function formatTime(timeString: string) {
  // Split the time to create a Date object in local time
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const time = new Date();
  time.setHours(hours, minutes, seconds);

  // Format to 12-hour time with 'am'/'pm' using options
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function validateBanglaInput(value: any) {
  const val = value.replace(/[a-zA-Z]/g, "");
  return val;
}

export function validateENGInput(value: any) {
  const val = value.replace(/[^a-zA-Z\s]/g, "");
  return val;
}

export function get_org_level_name() {
  const data = JSON.parse(localStorage.getItem("user_info"));
  return data?.roles?.[0].organizationType;
}

export function get_org_organizationLevelId() {
  const data = JSON.parse(localStorage.getItem("customer_login_auth"));
  return data?.user?.organizationLevelId || "";
}

export function get_org_UserGrp() {
  const data = JSON.parse(localStorage.getItem("customer_login_auth"));
  return data?.username;
}

export function getUserDetails() {
  const data = JSON.parse(localStorage.getItem("customer_login_auth"));
  return data;
}

export function get_all_role() {
  const data = JSON.parse(localStorage.getItem("all_role")) || [];
  return data;
}

export function validatePassword(password: any) {
  // Check if the length is exactly 6
  let msg = "";
  if (password.length < 6) {
    msg += "Password must be 6 characters long.";
  }

  // Regular expressions for required character types
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasDigit = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  // Validate each condition
  if (!hasUppercase.test(password)) {
    msg += " Password must include at least one uppercase letter.\n";
  }

  if (!hasLowercase.test(password)) {
    msg += " Password must include at least one lowercase letter.\n";
  }

  if (!hasDigit.test(password)) {
    msg += " Password must include at least one digit.\n";
  }

  if (!hasSpecialChar.test(password)) {
    msg += " Password must include at least one special character.\n";
  }

  // If all checks pass
  return msg;
}

export function img_link(link: string) {
  const data = API_URL + "/images/download/" + link;
  return data;
}

export function get_parent_name(id: any) {
  const permissiondata = JSON.parse(localStorage.getItem("permission"));

  const datas = permissiondata.data.find((d: any) => d.id == id);

  return datas;
}

// for decimal places
export function DecimalPlaces(e: any, customeSize: number) {
  const target = e.target as HTMLInputElement;
  const value = target.value;

  // Check if value exceeds the specified max length
  if (value.length > customeSize) {
    // Store the cursor position
    const cursorPosition = target.selectionStart;

    // Update value while respecting max length
    target.value = value.slice(0, customeSize);

    // Restore the cursor position if it's not at the end
    if (cursorPosition !== null) {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
}

export function permission_for_custom_route(pathname: any) {
  const permission_access: any = JSON.parse(localStorage.getItem("permission"));

  console.log(`permission_access`, permission_access);

  const custom_routes = [
    {
      route: "register-participants-add",
      menu_name: "Participant Registration",
      Parent_id: 45,
      id: 47,
      type: "Create",
    },
    {
      route: "participant-attendance-add",
      menu_name: "Participant Attendance",
      Parent_id: 45,
      id: 51,
      type: "Create",
    },
    {
      route: "add-projects-setup",
      menu_name: "Project Setup",
      Parent_id: 35,
      type: "Create",
      id: 37,
    },
    {
      route: "project-edit",
      menu_name: "Project Setup",
      Parent_id: 35,
      type: "UPDATE",
      id: 37,
    },
    {
      route: "batch-calendar-add",
      menu_name: "Training Calendar",
      Parent_id: 24,
      type: "Create",
      id: 82,
    },
    {
      route: "assessments-scores-add",
      menu_name: "Assessment Score",
      Parent_id: 24,
      type: "Save",
      id: 85,
    },
    {
      route: "add-certificate",
      menu_name: "Certificate Mgt",
      Parent_id: 24,
      type: "Create",
      id: 90,
    },
  ];

  let permission_ = true;

  permission_access?.data.find((d: any) => {
    custom_routes.find((cus_route: any) => {
      if (cus_route.Parent_id == d.id) {
        d?.subMenu?.find((sub: any) => {
          custom_routes.find((cus_route: any) => {
            if (cus_route.id == sub.id && pathname.includes(cus_route.route)) {
              const permission = sub.permission.find(
                (sub_cl: any) =>
                  sub_cl.name.toUpperCase() == cus_route.type.toUpperCase(),
              );
              permission_ = permission?.checked;
            }
          });
        });
      }
    });
  });

  return permission_;
}

export const modelCss = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  maxHeight: "90vh", // Limit height to viewport
  overflowY: "auto",
  p: 4,
};

const mobileNumnerValidate = (data: any) => {
  return data.length == 11;
};

export const statusOfQuestion = (output: any, question_id: number) => {
  for (let index = 0; index < output.length; index++) {
    const element = output[index];

    for (let index = 0; index < element.length; index++) {
      const el = element[index];
      if (el.question_id == question_id) {
        return 1;
      }
    }
  }

  return 2;
};

export const getPreviousQuestion = (output: any, question_id: number) => {
  for (let index = 0; index < output.length; index++) {
    const element = output[index];

    for (let index = 0; index < element.length; index++) {
      const el = element[index];
      if (el.question_id == question_id) {
        return el;
      }
    }
  }

  return null;
};

export const phasepromptdata = [
  {
    id: 1,
    question: "List of possible problem framings",
    blockId: null,
    phaseId: 1,
    prompt:
      'Summarize the problem statement from the user data and documents provided. Create multiple different summaries to frame the problems from different view points. Let\'s call these summaries "Problame Framings" . List them chronologically like "Problem Framing 1: (A short Title)" and then provide under 200 Words summary. The summaries should elaborate on the need of a new or redesigned institution to tackle the problem. Each framing can have different institutioal need mentioned. do not exceed 1000 words on the overall output.',
    sort: 1,
    status: 1,
  },
  {
    id: 2,
    question: "List of affected people",
    blockId: null,
    phaseId: 1,
    prompt:
      "based on the given data and problem statement find out who are the affected people or groups for that particular problem. List them chronologically from most affected to the least affected. Give a two to three sentence overview on how each of the group gets affected. Do not exceed 5 groups.",
    sort: 1,
    status: 1,
  },
  {
    id: 3,
    question: "List of Institutions Mapped",
    blockId: null,
    phaseId: 1,
    prompt:
      "Based on the data given to you previously and on the current problem statement, list the institutions that are relevant or have stakes in the problem statement. List the institutions by their name, mandate, brief description, sector. List them chronologically. do not go beyond 10 institutions. You may group them by type, for example government institutions or NGO or International Development agencies or private sector companies. If there are more than 10 institutions or such groupings, you do not need to list them further, just mention that there are more.",
    sort: 1,
    status: 1,
  },
  {
    id: 4,
    question: "List of Institutional Gaps",
    blockId: null,
    phaseId: 1,
    prompt:
      "List the institutional gaps from the problem statement. The gaps can be either the lack of institutions responsible for tackling the problem, or lack of existing models or role within the institution in question. Please list the institutional gaps chronologically in a numbered format. put short descriptions on each gap. Do not exceed 500 words for this analysis. ",
    sort: 1,
    status: 1,
  },
  {
    id: 9,
    question: "Proposed system mapping",
    blockId: null,
    phaseId: 1,
    prompt:
      '\r\nTake into account <List of Possible problem framings>, <list of affected people>, <list of institutions Mapped> and <list of institutional gaps>. Now based on the problem statement and those findings, create a summary report titled "Proposed System Mapping :" with a single line as a title for the problem statement.\r\n\r\nThe report should contain the summary of the problem statement, the affected people or groups, the institutional gaps and the institutions mapped for the problem statement. Then provide a very brief outline on what needs to be solved to create an institution of modify the existing institution to tackle the problem. Please take into account the TIAL\'s institutional design model and suggest what needs to be excersized in phase 2 of the model. The summary should contain these themes.\r\n\r\na. Map the landscape of existing institutions, systems, or initiatives relevant to the core problems. Include both direct service providers and indirect actors, such as advocacy organizations, policy-making bodies, and community groups. Analyze their mandates, key tasks, and historical effectiveness. Identify gaps or voids where new institutions, partnerships, or approaches might be needed.\r\n\r\nb.  Define the initial purpose of the institution or initiative. Take into consideration how it will address the identified core problems and goals in relation to the groups it intends to serve\r\n\r\nc. Evaluate the constraints—political, social, operational, or financial—that could affect the creation of a new institution. Rank these constraints by their potential impact and consider any interdependencies that could exacerbate challenges. Identify opportunities that can help materialize the initial purpose based on insights from the other outputs. Highlight collaborative possibilities and leverage points to push the boundaries of imagination while staying grounded in the initiative’s context.\r\n\r\nd.  Identify the key stakeholders who could form the guiding coalition. Specify their potential roles and contributions in overcoming constraints and leveraging opportunities. Clarify who owns the problem being addressed and outline mechanisms for coordination and shared accountability within the coalition.\r\n\r\nThe summary should not me larger than 2000 words\r\n',
    sort: 1,
    status: 1,
  },
];

export const enablePhaseOutput = () => {
  const data = localStorage.getItem("question_output");
  const output = data ? JSON.parse(data) : [];

  const blockdata = localStorage.getItem("block");
  const block = data ? JSON.parse(blockdata) : [];

  const blockID = block.map((d: any) => d.id);

  const questionsdata = localStorage.getItem("questions");
  const questions = data ? JSON.parse(questionsdata) : [];
  const quesID = questions.filter((d: any) => blockID.includes(d.blockId));

  return quesID.length == output.length;
};

export const getConversationIdByQues = (ques_id: any, output: any) => {
  let conversetion_id = "";
  output.filter((d: any) =>
    d.find((d2: any) => {
      if (d2.question_id == ques_id) {
        console.log(`d2`, d2);
        conversetion_id = d2.conversetion_id;
      }
    }),
  );
  return conversetion_id;
};

export function current_user_infos() {
  const data = JSON.parse(localStorage.getItem("customer_login_auth"));
  return data;
}
