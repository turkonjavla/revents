import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const UserDetailsSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {
          isCurrentUser ?
            <Button as={Link} to='/settings' fluid inverted color="blue" content='Edit Profile' /> :
            <Button fluid inverted color="blue" content='Follow User' />
        }
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailsSidebar
