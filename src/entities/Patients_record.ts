import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class PatientRecord extends Model {
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Patient Id is required' }, // add a validation message
    },
  })
  patient_id: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Picture is required' }, // add a validation message
    },
  })
  patient_pic: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Comments is required' }, // add a validation message
    },
  })
  comments: string;
}
