import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  //   BelongsToMany,
} from 'sequelize-typescript';
import { PatientRecord } from './Patients_record';
import { Patient } from './Patients';
import { Hospital } from './Hospital';

@Table
export class Operator extends Model {
  @PrimaryKey // Decorate the primary key column with PrimaryKey decorator
  @Column({
    allowNull: false,
    autoIncrement: true, // Add autoIncrement for auto-incrementing primary key
  })
  o_id: number;
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'First name is required' }, // add a validation message
    },
  })
  o_first_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Operator last name is required' }, // add a validation message
    },
  })
  o_last_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Operator email is required' }, // add a validation message
    },
  })
  o_email: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Operator phone no is required' }, // add a validation message
    },
  })
  o_phone_no: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Operator password is required' }, // add a validation message
    },
  })
  o_password: string;

  @ForeignKey(() => Hospital)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Hospital Id is required' }, // add a validation message
    },
  })
  o_hospital_id: number;

  @HasMany(() => PatientRecord, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  patient_record: PatientRecord[];

  @HasMany(() => Patient, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  patient: Patient[];

  @BelongsTo(() => Hospital, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  hospital: Hospital;
}
