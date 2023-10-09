// import { Model } from 'sequelize';
import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { PatientRecord } from './Patients_record';
import { Operator } from './Operators';

@Table
export class Patient extends Model {
  @PrimaryKey // Decorate the primary key column with PrimaryKey decorator
  @Column({
    allowNull: false,
    autoIncrement: true, // Add autoIncrement for auto-incrementing primary key
  })
  p_id: number;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Email is required' }, // add a validation message
    },
  })
  p_first_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Last name is required' }, // add a validation message
    },
  })
  p_last_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  p_email: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Address is required' }, // add a validation message
    },
  })
  p_address: string;

  @Column({
    allowNull: false,
    type: DataType.DATE, // Set the type to DataType.DATE for a DATE field
    validate: {
      notNull: { msg: 'Date of Birth is required' },
    },
  })
  p_dob: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Phone no is required' }, // add a validation message
    },
  })
  p_phone_no: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'State of is required' }, // add a validation message
    },
  })
  p_state: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Local government is required' }, // add a validation message
    },
  })
  p_lga: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Next of kin is required' }, // add a validation message
    },
  })
  p_nok: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Relationship with Next of kin is required' }, // add a validation message
    },
  })
  p_relationship_with_nok: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Phone no of next of kin is required' }, // add a validation message
    },
  })
  p_phone_no_of_nok: string;

  @ForeignKey(() => Operator)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Operator id required' }, // add a validation message
    },
  })
  p_operator_id: number;

  @HasMany(() => PatientRecord, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  patient_records: PatientRecord[];

  @BelongsTo(() => Operator, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  operator: Operator;
}
