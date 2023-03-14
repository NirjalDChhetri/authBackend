import {  PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class CommonField {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date
}