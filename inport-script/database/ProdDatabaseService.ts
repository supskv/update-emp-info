import { Client } from "pg";
import { DataTypes, Sequelize } from "sequelize";

class ProdDatabaseService {
  client: Sequelize;
  Employee: any;
  constructor() {
    // this.client = new Sequelize('hrccs_dev_update_employee', 'doadmindev@ccs-chatbot-pgsql-dev', 'C2aV/3A*2mT7!xa)', {
    //   host: 'ccs-chatbot-pgsql-dev.postgres.database.azure.com',
    //   dialect: 'postgres`',
    //   logging: false
    // });

    this.client = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: process.env.NODE_ENV !== "prod" ? console.log : false,
      }
    );
    this.Employee = this.client.define(
      "Employee",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        person_id: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        personnel_number: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        scg_employee_id: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        name_prefix_th: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        first_name_th: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        last_name_th: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        nickname: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        position_name_th: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        company: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        business_unit: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        division: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        department: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        employment_status: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        contract_type: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        username: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        email: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        updated_at: {
          type: "TIMESTAMPTZ",
          allowNull: false,
        },
        updated_by: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        created_by: {
          type: "VARCHAR",
          allowNull: true,
        },
        photo: {
          type: new DataTypes.STRING(1000),
          allowNull: true,
        },
        pl: { type: DataTypes.STRING },
        scg_pl: { type: DataTypes.STRING },
        sub1_shift_th: { type: DataTypes.STRING },
        shift_th: { type: DataTypes.STRING },
        sub1_section_th: { type: DataTypes.STRING },

        section_th: { type: DataTypes.STRING },
        sub1_department_th: { type: DataTypes.STRING },
        sub1_division_th: { type: DataTypes.STRING },

        sub1_company_th: { type: DataTypes.STRING },
        sub1_1_business_unit_th: { type: DataTypes.STRING },
        business_unit_desc_th: { type: DataTypes.STRING },
      },
      {
        // Other model options go here
        tableName: "employees",
        schema: "chatbot",
        timestamps: false,
        underscored: true,
      }
    );
    // this.client = new Client({
    //   host: 'localhost',
    //   port: 5432,
    //   database: 'hrccs_local',
    //   user: 'postgres',
    //   password: '1234',
    // })

    // this.roleRepository = null
  }

  async initDatabase() {
    const that = this;
    return new Promise(async (resolve, reject) => {
      // that.client.connect(err => {
      //   if (err) {
      //     console.error('connection error', err.stack)
      //     reject(err)
      //   } else {
      //     console.log('connected')

      //     // Init Repository
      //     // that.roleRepository = new ProdRoleRepository(that.client);
      //     resolve(that.client)
      //   }
      // })
      try {
        await this.client.authenticate();
        console.log(
          `> Connection [${this.client.getDatabaseName()}] has been established successfully.`
        );
        resolve({ client: that.client, Employee: that.Employee });
      } catch (error) {
        // console.error("> Unable to connect to the database:", error);
        reject(error);
      }
    });
  }
}

export default ProdDatabaseService;
