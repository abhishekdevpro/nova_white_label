import React from 'react';
import styled from 'styled-components';

const ContactsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: calc(100vh - 120px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 3px;
  }
`;

const ContactItem = styled.li`
  padding: 12px 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${props => props.isActive ? '#f0f7ff' : 'transparent'};
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f5f8fa;
  }
`;

const ContactLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  flex-shrink: 0;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserTitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeInfo = styled.span`
  font-size: 12px;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const MessageCount = styled.span`
  background-color: ${props => props.variant === 'success' ? '#22c55e' : 
                              props.variant === 'warning' ? '#f59e0b' : '#3b82f6'};
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

const contacts = [
  {
    id: 1,
    name: "Darlene Robertson",
    title: "Head of Development",
    image: "/images/resource/candidate-1.png",
    time: "35 mins"
  },
  {
    id: 2,
    name: "Jane Cooper",
    title: "Head of Development",
    image: "/images/resource/candidate-2.png",
    time: "35 mins",
    messageCount: 2
  },
  {
    id: 3,
    name: "Arlene McCoy",
    title: "Head of Development",
    image: "/images/resource/candidate-3.png",
    time: "35 mins",
    messageCount: 2,
    variant: "success"
  },
  {
    id: 4,
    name: "Albert Flores",
    title: "Head of Development",
    image: "/images/resource/candidate-4.png",
    time: "35 mins"
  },
  {
    id: 5,
    name: "Williamson",
    title: "Head of Development",
    image: "/images/resource/candidate-5.png",
    time: "35 mins",
    messageCount: 2,
    variant: "warning",
    isActive: true
  },
  {
    id: 6,
    name: "Kristin Watson",
    title: "Head of Development",
    image: "/images/resource/candidate-6.png",
    time: "35 mins"
  },
  {
    id: 7,
    name: "Annette Black",
    title: "Head of Development",
    image: "/images/resource/candidate-7.png",
    time: "35 mins"
  },
  {
    id: 8,
    name: "Jacob Jones",
    title: "Head of Development",
    image: "/images/resource/candidate-8.png",
    time: "35 mins"
  }
];

const ChatboxContactList = ({ onSelectContact, activeContactId }) => {
  return (
    <ContactsList>
      {contacts.map((contact) => (
        <ContactItem 
          key={contact.id}
          isActive={contact.isActive || contact.id === activeContactId}
          onClick={() => onSelectContact && onSelectContact(contact)}
        >
          <ContactLink href="#" onClick={(e) => e.preventDefault()}>
            <ContactWrapper>
              {/* <ImageContainer>
                <UserImage
                  src={contact.image}
                  alt={`${contact.name}'s avatar`}
                />
              </ImageContainer> */}
              <UserInfo>
                <UserName>{contact.name}</UserName>
                <UserTitle>{contact.title}</UserTitle>
              </UserInfo>
              <TimeInfo>
                {contact.time}
                {contact.messageCount && (
                  <MessageCount variant={contact.variant}>
                    {contact.messageCount}
                  </MessageCount>
                )}
              </TimeInfo>
            </ContactWrapper>
          </ContactLink>
        </ContactItem>
      ))}
    </ContactsList>
  );
};

export default ChatboxContactList;