import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';

const UserDetailsSidebar = () => {
  return (
    <Grid.Column width={4}>
      <Segment>
        <Button fluid inverted color="blue" content='Edit Profile' />
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailsSidebar
