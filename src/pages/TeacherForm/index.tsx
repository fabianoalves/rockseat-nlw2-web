import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import warningIcon from '../../assets/images/icons/warning.svg'
import Select from '../../components/Select/index';

import './style.css';
import api from '../../services/api';


function TeacherForm(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''}
    ]);

    function setSCheduleItemValue(index: number, field: string, value: string){
        const updatedValues = scheduleItems.map((item, item_index) => {
            if(index === item_index){
                return {...item, [field]: value};
            }
            return item;
        })
        setScheduleItems(updatedValues);
    }

    function addNewScheduleItem(){
        setScheduleItems([
             ...scheduleItems,
             {week_day: 0, from: '', to: ''}
        ]);
    }

    function haddleCreateClass(e: FormEvent){
        e.preventDefault();
        console.log({
            name, avatar, whatsapp, bio,
            subject, cost, scheduleItems,
        })

        api.post('classes',{
            name, 
            avatar, 
            whatsapp, 
            bio,
            subject, 
            cost : Number(cost),
            schedule: scheduleItems,
        }).then(() => {
            alert("Cadastro efetuado com sucesso!");
            history.push('/');
        }).catch((e) => {
            console.log(e);
            alert("Erro ao efetuar o cadastro")
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrivel que voce quer dar aula."
                description="O primeiro passo, é preencher esse formulário de inscrição." />
            <main>
                <form onSubmit={haddleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
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
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>


                    <fieldset>
                        <legend>
                            Horarios disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>


                        {scheduleItems.map((item, index) => {
                            return(
                                <div key={item.week_day} className="schedule-item">
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
                                        value={item.week_day}
                                        onChange={e => setSCheduleItemValue(index, 'week_day', e.target.value)}
                                    />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time" 
                                        value={item.from}
                                        onChange={e => setSCheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time" 
                                        value={item.to}
                                        onChange={e => setSCheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                        

                    </fieldset>


                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}
 export default TeacherForm;