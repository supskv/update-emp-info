import projectDependencies from "./config/projectDependencies";
import GetPortByEmail from "./app/use_case/get_port_by_email";
import GetPortByCreateDate from "./app/use_case/get_port_by_create_date";
import * as moment from "moment";

// Function variables
let inserted_count = 0;
let updated_count = 0;
let skipped_count = 0;

const boostrap = async () => {
  // console.log(await checkPortData({ email: "boworant@scg.com" }));
  // return;

  // Model
  let Employee: any;

  // Reset function variables
  inserted_count = 0;
  updated_count = 0;
  skipped_count = 0;

  try {
    const db: any = await projectDependencies.prodDatabaseService.initDatabase();

    // Add Employee model
    Employee = db.Employee;
  } catch (err) {
    console.error(`> Unable to connect to the database`, err);
    return;
  }

  try {
    const rows = await Employee.findAll({
      where: { email: "METANONJ@SCG.COM" },
    });
    for (let i = 0; i < rows.length; i++) {
      const eData = rows[i];
      const portData: any = await checkPortData({ email: eData.email });
      if (!portData) {
        skipped_count++;
        continue;
      }
      await upsertPortDataToEmployee({
        Employee: Employee,
        email: eData.email,
        objData: portData.data,
      });
      console.log(`> processing ${i + 1}/${rows.length}`);
    }

    // const rows = await getEmployeePorts({create_date: moment().format("YYYY-MM-DD")})
    // for (let i = 0; i < rows.length; i++) {
    //   const eData = rows[i];
    //   await upsertPortDataToEmployee({
    //     Employee: Employee,
    //     email: eData.EMAIL_ADDRESS_BUSINESS,
    //     objData: {employee_data: eData},
    //   });
    //   console.log(`> processing ${i + 1}/${rows.length}`);
    // }

    console.log(
      `> finished inserted: ${inserted_count}, updated: ${updated_count}, skipped: ${skipped_count} unit.`
    );
  } catch (err) {
    console.error(err);
  }
};

const checkPortData = async ({ email }) => {
  try {
    const res = await GetPortByEmail({ email });
    return res;
  } catch (err) {
    console.log(`> ${email} not found.`);
  }
};

const getEmployeePorts = async ({ create_date }): Promise<any[]> => {
  try {
    const res = await GetPortByCreateDate({ create_date });
    return res?.employee_data || [];
  } catch (err) {
    console.log(`> ${create_date} not found.`);
  }
};

const upsertPortDataToEmployee = async ({ Employee, email, objData }: any) => {
  return new Promise(async (resolve, reject) => {
    let values: any = getEmpValues(objData);
    try {
      const emp = await Employee.findOne({
        where: { email: email.toUpperCase() },
      });
      if (!emp) {
        await Employee.create({ ...values, created_at: new Date() });
        inserted_count++;
      } else {
        await emp.update(values);
        updated_count++;
      }
      resolve();
    } catch (err) {
      console.log(`> Cannot update port to employee ${email}`, err);
      reject(err);
    }
  });
};

const getEmpValues = (objData: any) => {
  return {
    person_id: objData.employee_data.PERSON_ID,
    personnel_number: objData.employee_data.PERSON_NO,
    scg_employee_id: objData.employee_data.SCG_EMP_ID,
    name_prefix_th: objData.employee_data.NAME_PREFIX_TH,
    first_name_th: objData.employee_data.FIRST_NAME_TH,
    last_name_th: objData.employee_data.LAST_NAME_TH,
    nickname: objData.employee_data.NICK_NAME,
    position_name_th: objData.employee_data.POSITION_NAME_TH,
    company: objData.employee_data.COMPANY_TH,
    business_unit: objData.employee_data.SUB1_BUSINESS_UNIT_TH,
    division: objData.employee_data.DIVISION_TH,
    department: objData.employee_data.DEPARTMENT_TH,
    employment_status: objData.employee_data.EMP_STATUS_TEXT,
    contract_type: objData.employee_data.EMP_GROUP_TEXT,
    username: objData.employee_data.EMAIL_ADDRESS_BUSINESS,
    email: objData.employee_data.EMAIL_ADDRESS_BUSINESS,
    // photo: objData.employee_data.PHOTO_TEXT,

    // Fields in phase 3
    pl: objData.employee_data.PL,
    scg_pl: objData.employee_data.SCG_PL,
    sub1_shift_th: objData.employee_data.SUB1_SHIFT_TH,
    shift_th: objData.employee_data.SHIFT_TH,
    sub1_section_th: objData.employee_data.SUB1_SECTION_TH,
    section_th: objData.employee_data.SECTION_TH,
    sub1_department_th: objData.employee_data.SUB1_DEPARTMENT_TH,
    sub1_division_th: objData.employee_data.SUB1_DIVISION_TH,
    sub1_company_th: objData.employee_data.SUB1_COMPANY_TH,
    sub1_1_business_unit_th: objData.employee_data.SUB1_1_BUSINESS_UNIT_TH,
    business_unit_desc_th: objData.employee_data.BUSINESS_UNIT_DESC_TH,
    updated_at: new Date(),
  };
};

export { boostrap };
