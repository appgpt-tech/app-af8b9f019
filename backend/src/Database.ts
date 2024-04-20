//Source code generated by AppGPT (www.appgpt.tech)

//Class to create tables and seed new database
import { DataSource } from 'typeorm';
import { DBConfiguration } from './Configuration';
import { SettingsEntity } from './db/Settings.entity';
//autogenerate imports based on resources
import { UsersEntity } from './db/Users.entity';
import { DepartmentsEntity } from './db/Departments.entity';
import { InitiativesEntity } from './db/Initiatives.entity';
import { GoalsEntity } from './db/Goals.entity';
import { EmissionSourcesEntity } from './db/EmissionSources.entity';
import { ResourceUsageEntity } from './db/ResourceUsage.entity';

export class Database {
  static dbConfiguration: DBConfiguration;
  public static ds: DataSource;

  static async Initialize(dbConfiguration: DBConfiguration) {
    Database.dbConfiguration = dbConfiguration;
    let dbConfig: any = dbConfiguration as any;
    //Autogenerate entities array from resource names

    dbConfig.entities = [
      SettingsEntity,
      UsersEntity,
      DepartmentsEntity,
      InitiativesEntity,
      GoalsEntity,
      EmissionSourcesEntity,
      ResourceUsageEntity,
    ];
    Database.ds = new DataSource(dbConfig);
    await Database.ds.initialize();

    //TODO: Drop all tables

    await Database.Seed();
  }
  static async Seed() {
    let data: any = {
      Users: [
        {
          userName: 'userName 1',
          department: 1,
          password: 'password 1',
          email: 'email 1',
          id: 88,
        },
        {
          userName: 'userName 2',
          department: 2,
          password: 'password 2',
          email: 'email 2',
          id: 72,
        },
        {
          userName: 'userName 3',
          department: 3,
          password: 'password 3',
          email: 'email 3',
          id: 12,
        },
        {
          userName: 'userName 4',
          department: 4,
          password: 'password 4',
          email: 'email 4',
          id: 72,
        },
        {
          userName: 'userName 5',
          department: 5,
          password: 'password 5',
          email: 'email 5',
          id: 69,
        },
      ],
      Departments: [
        { departmentName: 'departmentName 1', departmentHead: 1, id: 12 },
        { departmentName: 'departmentName 2', departmentHead: 2, id: 4 },
        { departmentName: 'departmentName 3', departmentHead: 3, id: 41 },
        { departmentName: 'departmentName 4', departmentHead: 4, id: 91 },
        { departmentName: 'departmentName 5', departmentHead: 5, id: 67 },
      ],
      Initiatives: [
        {
          name: 'name 1',
          description: 'description 1',
          startDate: '2024-12-06T17:38:44.535Z',
          endDate: '2024-08-10T16:21:37.020Z',
          relatedDepartment: 1,
          status: 'status 1',
          id: 10,
        },
        {
          name: 'name 2',
          description: 'description 2',
          startDate: '2025-02-17T03:55:42.798Z',
          endDate: '2024-06-28T16:27:28.468Z',
          relatedDepartment: 2,
          status: 'status 2',
          id: 11,
        },
        {
          name: 'name 3',
          description: 'description 3',
          startDate: '2024-07-10T09:24:25.648Z',
          endDate: '2023-11-05T09:34:08.532Z',
          relatedDepartment: 3,
          status: 'status 3',
          id: 67,
        },
        {
          name: 'name 4',
          description: 'description 4',
          startDate: '2023-09-08T08:30:29.952Z',
          endDate: '2024-12-21T18:54:48.359Z',
          relatedDepartment: 4,
          status: 'status 4',
          id: 60,
        },
        {
          name: 'name 5',
          description: 'description 5',
          startDate: '2025-04-07T14:27:44.097Z',
          endDate: '2024-06-16T17:42:45.957Z',
          relatedDepartment: 5,
          status: 'status 5',
          id: 53,
        },
      ],
      Goals: [
        {
          name: 'name 1',
          description: 'description 1',
          targetDate: '2025-03-29T13:57:16.267Z',
          relatedDepartment: 1,
          status: 'status 1',
          id: 45,
        },
        {
          name: 'name 2',
          description: 'description 2',
          targetDate: '2024-11-06T11:54:39.177Z',
          relatedDepartment: 2,
          status: 'status 2',
          id: 20,
        },
        {
          name: 'name 3',
          description: 'description 3',
          targetDate: '2024-07-11T08:18:30.205Z',
          relatedDepartment: 3,
          status: 'status 3',
          id: 19,
        },
        {
          name: 'name 4',
          description: 'description 4',
          targetDate: '2024-01-02T21:36:49.828Z',
          relatedDepartment: 4,
          status: 'status 4',
          id: 60,
        },
        {
          name: 'name 5',
          description: 'description 5',
          targetDate: '2024-10-17T17:02:49.397Z',
          relatedDepartment: 5,
          status: 'status 5',
          id: 100,
        },
      ],
      EmissionSources: [
        {
          sourceType: 'sourceType 1',
          quantityUsed: 0.72,
          emissionFactors: 0.53,
          totalEmissions: 0.2,
          id: 94,
        },
        {
          sourceType: 'sourceType 2',
          quantityUsed: 0.55,
          emissionFactors: 0.28,
          totalEmissions: 0.38,
          id: 76,
        },
        {
          sourceType: 'sourceType 3',
          quantityUsed: 0.32,
          emissionFactors: 0.31,
          totalEmissions: 0.99,
          id: 76,
        },
        {
          sourceType: 'sourceType 4',
          quantityUsed: 0.46,
          emissionFactors: 0.43,
          totalEmissions: 0.78,
          id: 78,
        },
        {
          sourceType: 'sourceType 5',
          quantityUsed: 0.64,
          emissionFactors: 0.6,
          totalEmissions: 0.21,
          id: 5,
        },
      ],
      ResourceUsage: [
        {
          resourceType: 'resourceType 1',
          quantityConsumed: 0.89,
          unitOfMeasurement: 'unitOfMeasurement 1',
          periodOfConsumption: '2024-11-16T14:16:12.750Z',
          id: 82,
        },
        {
          resourceType: 'resourceType 2',
          quantityConsumed: 0.88,
          unitOfMeasurement: 'unitOfMeasurement 2',
          periodOfConsumption: '2023-07-13T21:18:04.803Z',
          id: 100,
        },
        {
          resourceType: 'resourceType 3',
          quantityConsumed: 0.35,
          unitOfMeasurement: 'unitOfMeasurement 3',
          periodOfConsumption: '2024-02-07T11:39:36.107Z',
          id: 17,
        },
        {
          resourceType: 'resourceType 4',
          quantityConsumed: 0.43,
          unitOfMeasurement: 'unitOfMeasurement 4',
          periodOfConsumption: '2024-03-13T13:57:34.572Z',
          id: 68,
        },
        {
          resourceType: 'resourceType 5',
          quantityConsumed: 0.77,
          unitOfMeasurement: 'unitOfMeasurement 5',
          periodOfConsumption: '2024-05-06T08:21:06.127Z',
          id: 39,
        },
      ],
    };
    //Autogenerate multiple such calls ie for each resource and its data object
    let isSeeded = await this.IsSeeded();
    //if (!isSeeded) {
    //forcing app recreation
    if (true) {
      console.log('   Seeding database...');
      await this.SeedResource('UsersEntity', data.Users);
      await this.SeedResource('DepartmentsEntity', data.Departments);
      await this.SeedResource('InitiativesEntity', data.Initiatives);
      await this.SeedResource('GoalsEntity', data.Goals);
      await this.SeedResource('EmissionSourcesEntity', data.EmissionSources);
      await this.SeedResource('ResourceUsageEntity', data.ResourceUsage);
      await this.SeedResource('SettingsEntity', {
        settingname: 'isSeeded',
        settingvalue: 'true',
      });
    } else {
      console.log('   Database seeded already!');
    }
  }
  static async IsSeeded() {
    const repo = Database.ds.getRepository('SettingsEntity');
    let rec: any = await repo.findOne({
      select: {
        settingname: true,
        settingvalue: true,
      },
      where: {
        settingname: 'isSeeded',
      },
    });
    if (rec && rec.settingvalue) return true;
    return false;
  }
  static async SeedResource(resourceName: any, resourceData: any) {
    const repo = Database.ds.getRepository(resourceName);
    //await repo.clear();
    console.log('   Seeding table ' + resourceName);
    await repo.upsert(resourceData, ['id']);
  }
}
