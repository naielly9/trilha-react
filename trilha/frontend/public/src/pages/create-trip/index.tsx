import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import {ConfirmTripModal} from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestStep } from './steps/invite-guest-step'

export function CreateTripPage() {

  const navigate = useNavigate()
  const [isGuestInputOpen, setIsGuestsInputOpen]= useState(false)
  const [isGuestModalOpen, setIsGuestsModalOpen]= useState(false)
  const [isConfirmTripModalOpen, setIsConfirmModalOpen]= useState(false)
  

  const [emailsToInvite, setEmailsToInvite]= useState([
    'nainai@gmai.com',
  ])

  function openGuestsInput(){
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput(){
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal(){
    setIsGuestsModalOpen(true)
  }

  function closeGuestModal(){
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal(){
    setIsConfirmModalOpen(true)
  }

  function closeConfirmTripModal(){
    setIsConfirmModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      return
    }

    if(emailsToInvite.includes(email)){
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])  

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string){
    const newWmailList = emailsToInvite.filter(email => email !== emailToRemove)
    
    setEmailsToInvite(newWmailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10" >
            <div className='flex flex-col items-center gap-3'>
              <img src='/logo3.png' alt='plann.er' />
              <p className="text-zinc-300 text-lg">
                Convide seus amigos e planeje sua próxima viagem!
              </p>
            </div>
            <div className='space-y-4'>
              <DestinationAndDateStep 
                isGuestInputOpen={isGuestInputOpen}
                closeGuestsInput={closeGuestsInput}
                openGuestsInput={openGuestsInput}
              />
              {isGuestInputOpen && (
                  <InviteGuestStep 
                    openConfirmTripModal={openConfirmTripModal}
                    openGuestsModal={openGuestsModal}
                    emailsToInvite={emailsToInvite}
                  />
              )}
            </div>
            <p  className="text-sm text-zinc-500">
              Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
              com nossos <a  className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade.</a>
            </p>
          </div>

          {isGuestModalOpen && (
            <InviteGuestsModal 
              emailsToInvite={emailsToInvite}
              addNewEmailToInvite={addNewEmailToInvite}
              closeGuestModal={closeGuestModal}
              removeEmailFromInvites={removeEmailFromInvites}
            />
          )}

          {isConfirmTripModalOpen && (
            <ConfirmTripModal 
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            />
          )}
          

    </div>
    
  )
}


