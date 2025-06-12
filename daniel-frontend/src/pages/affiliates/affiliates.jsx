import React from 'react'
import HeaderAffiliates from '../../Components/afffiliates/Header';
import InputsAffiliates from '../../components/afffiliates/Inputs';
import ManagedClintsAffiliates from '../../components/afffiliates/ManagedClints';
import Sublayout from '../../layouts/Sublayout';
import { ClientProvider } from '../../context/ClientContext';


const Affiliates = () => {
    return (
        <Sublayout>
            <HeaderAffiliates />
            <ClientProvider>
                <InputsAffiliates />
                <ManagedClintsAffiliates />
            </ClientProvider>
        </Sublayout>
    )
}

export default Affiliates;