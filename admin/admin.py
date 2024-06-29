import firebase_admin
from firebase_admin import credentials

from firebase_admin import firestore

from firebase_admin import auth

import datetime

import pandas as pd


# sa nu uiti sa iei un service account key de la firebase 


cred = credentials.Certificate("./service-account-aici.json")
firebase_admin.initialize_app(cred)

database = firestore.client()

def write_users_to_excel(users):
    df = pd.DataFrame(users)
    #add an index column in the dataframe
    df.reset_index(inplace=True)
    df.to_excel('users.xlsx', index=False)





def convert_timestamp_to_date(timestamp):
    return datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')



def get_auth_user_data():

    users = []

    firestore_users = get_firestore_user_data()

    for user in auth.list_users().iterate_all():
        if user.uid in firestore_users:
            users.append(convert_timestamp_to_date(user.user_metadata.creation_timestamp / 1000))

    return users

def get_user_auth_timestamp(user):
    return user.user_metadata.creation_timestamp / 1000




def get_firestore_user_data():

    users = []

    users_ref = database.collection(u'users')
    docs = users_ref.stream()

    for doc in docs:
        docId = doc.id
        users.append(docId)

    return users




def update_user(user_id, new_data):
    try:
        # Reference to the user document
        user_ref = database.collection('users').document(user_id)

        # Update the document with new data
        user_ref.update(new_data)

        print(f"User with ID {user_id} updated successfully")
    except Exception as e:
        print(f"Error updating user: {e}")






def update_all_users():

    user_ids = get_firestore_user_data()

    for user_id in user_ids:
        auth_timestamp = get_user_auth_timestamp(auth.get_user(user_id))

        update_user(user_id, {'auth_timestamp': auth_timestamp})

    
    print("All users updated successfully")




          


