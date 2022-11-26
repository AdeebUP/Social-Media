import { Modal, useMantineTheme } from '@mantine/core';

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name='FirstName'
            placeholder='First Name'
          />
          <input
            type="text"
            className="infoInput"
            name='LastName'
            placeholder='Last Name'
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name='worksAT'
            placeholder='works at'
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name='LivesIn'
            placeholder='Lives in'
          />
          <input
            type="text"
            className="infoInput"
            name='Country'
            placeholder='Country'
          />
        </div>
        <div>
          <input
            type="text"
            className='infoInput'
            placeholder='RelationShip Status'
          />
        </div>
        <div>
          Profile Image
          <input type="file" className="profileImg" />
          Cover Image
          <input type="file" className="coverImg" />
        </div>
        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal