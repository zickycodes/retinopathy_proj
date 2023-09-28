import {
  Table,
  Column,
  Model,
  BelongsTo,
  HasOne,
  ForeignKey,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { Patient } from './Patients';
import { Operator } from './Operators';
import { Doctor } from './Doctors';
import { PatientResult } from './Patients_results';
import { PatientDiagnosis } from './Patient_diagnosis';
// import {PatientResult}

@Table
export class PatientRecord extends Model {
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

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    type: DataType.TEXT,
    validate: {
      notNull: { msg: 'Comments is required' }, // add a validation message
    },
  })
  comments: string;

  @HasOne(() => PatientDiagnosis)
  patient_diagnosis: PatientDiagnosis;

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Operator)
  operator: Operator;

  @BelongsToMany(() => Doctor, () => PatientResult)
  doctors: Doctor[];
}
