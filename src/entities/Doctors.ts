// import { Model } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
  //   HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import { PatientRecord } from './Patients_record';
import { PatientResult } from './Patients_results';
import { PatientDiagnosis } from './Patient_diagnosis';

@Table
export class Doctor extends Model {
  @PrimaryKey // Decorate the primary key column with PrimaryKey decorator
  @Column({
    allowNull: false,
    autoIncrement: true, // Add autoIncrement for auto-incrementing primary key
  })
  d_id: number;
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Email is required' }, // add a validation message
    },
  })
  d_first_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  d_last_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  d_email: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  d_password: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  d_phone_no: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  d_address: string;

  @HasMany(() => PatientDiagnosis, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  patient_diagnosis: PatientDiagnosis[];

  @BelongsToMany(() => PatientRecord, () => PatientResult)
  patient_records: PatientRecord[];
}
