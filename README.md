# Goal: Build a web app that allows messages to be sent between users.

# Basic app requirements:

1. Authorization.
2. Sending messages to another user.
3. Customizing a user profile.

# Notes:

1. REST API backend cannot handle real time updates as it is a 'request - response' server. ie: When sending a message to another user, the other user will not be able to receive the message since the data it has not been 'requested'. No need to implement server-client updates.

# Extra credit:

1. Allow sending images in chat.
2. Create a _friends list_ for each user to add friends to & also view who's currently online.
3. Allow users to create & send messages in group chats.
