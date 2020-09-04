import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('tasks')
class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;


    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column('timestamp with time zone')
    delivery_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
}

export default Task;
