import {
  Table,
  Column,
  Model,
  BelongsTo,
  HasOne,
  ForeignKey,
  BelongsToMany,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { Patient } from './Patients';
import { Operator } from './Operators';
import { Doctor } from './Doctors';
import { PatientResult } from './Patients_results';
import { PatientDiagnosis } from './Patient_diagnosis';
// import {PatientResult}

@Table
export class PatientRecord extends Model {
  @PrimaryKey // Decorate the primary key column with PrimaryKey decorator
  @Column({
    allowNull: false,
    autoIncrement: true, // Add autoIncrement for auto-incrementing primary key
  })
  pr_id: number;

  @ForeignKey(() => Patient)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Patient Id is required' }, // add a validation message
    },
  })
  patientId: number;

  @ForeignKey(() => Operator)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Operator Id is required' }, // add a validation message
    },
  })
  operator_id: number;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Picture is required' }, // add a validation message
    },
  })
  patient_pic: string;

  // @Column({
  //   allowNull: false, // set the allowNull option to false to enforce not null constraint
  //   validate: {
  //     notNull: { msg: 'Picture ID is required' }, // add a validation message
  //   },
  // })
  // patient_pic_id: string;

  @Column({})
  pr_pic_id: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    type: DataType.TEXT,
    validate: {
      notNull: { msg: 'Comments is required' }, // add a validation message
    },
  })
  pr_complaint: string;

  @HasOne(() => PatientDiagnosis, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  patient_diagnosis: PatientDiagnosis;

  @BelongsTo(() => Patient, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  patient: Patient;

  @BelongsTo(() => Operator)
  operator: Operator;

  @BelongsToMany(() => Doctor, () => PatientResult)
  doctors: Doctor[];
}
