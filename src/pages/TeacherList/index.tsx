import React, { useState, FormEvent } from 'react';


import './style.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input/index';
import Select from '../../components/Select/index';
import api from '../../services/api';



function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();
        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            }
        })
        setTeachers(response.data);

    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria" 
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciencias', label: 'Ciências' },
                            { value: 'Matematica', label: 'Matemática' }
                        ]}
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da Semana"
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                            
                        ]} 
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora" 
                        value={time}
                        onChange={(e) => { setTime(e.target.value); }}
                    />
                    <button>Buscar</button>
                    {/* <div className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="week_day">Dia da Semana</label>
                        <input type="text" id="week_day" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="time">Hora</label>
                        <input type="text" id="time" />
                    </div> */}

                </form>
            </PageHeader>
            
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
                {/* <TeacherItem />
                <TeacherItem />
                <TeacherItem /> */}
            </main>
        </div>
    )
}
 export default TeacherList;