import sys, json, pandas as pd, numpy as np
from sklearn.preprocessing import LabelEncoder

def main():
    pd.set_option('display.max_rows', 1000)
    pd.set_option('display.max_columns', 500)
    pd.set_option('display.width', 1000)

    # Read data from request
    json_blob = json.loads(sys.stdin.readlines()[0])

    # reading JSON file
    test_team = json.loads(json_blob)
    df_json = pd.DataFrame(test_team)

    # Entire Fifa19 dataframe
    data = pd.read_csv('/app/data/players_data.csv')

    df_teams = df_json

    # ### Getting Club players
    def get_club_players(df_teams):
        
        df_club_list = df_teams[['Name','Position','OvervalueRatio','Overall','Potential','Wage']]
        
        sort_club_list = df_club_list.sort_values(by='OvervalueRatio', ascending=False)

        df_top_2_rated_players = sort_club_list.head(2)

        df_bottom_2_rated_players = sort_club_list.tail(2)

        return df_club_list, df_top_2_rated_players, df_bottom_2_rated_players


    df_attributes = data[['FieldPositionNum', 'Overall', 'Potential', 'Crossing', 'Finishing', 
                            'HeadingAccuracy', 'ShortPassing', 'Volleys', 'Dribbling', 'Curve',
                            'FKAccuracy', 'LongPassing', 'BallControl', 'Acceleration', 'SprintSpeed', 
                            'Agility', 'Reactions', 'Balance', 'ShotPower', 'Jumping', 'Stamina', 
                            'Strength', 'LongShots', 'Aggression', 'Interceptions', 'Positioning', 
                            'Vision', 'Penalties', 'Composure', 'Marking']]


    # Recommender System

    # Create function that uses above 'suggested' variables to output x players to potentially obtain by trade
    # for df_attributes dataframe, see above cells

    def get_suggested_trades(df_teams):  # player argument changed to 'club', after get_club_players refactored
        trades_p1 = []  # this will be the output object that club_suggested_changes receives/uses
        trades_p2 = []
        players_wages = []

        all_players, top_2, bottom_2 = get_club_players(df_teams)  # df_club_list, df_top_2_players, df_bottom_2_players

        # looping throught 2 player names in 'top_2'
        for idx, player in enumerate(top_2.Name):

            # getting 'index' for player in 'df_teams' DF
            input_player_index = df_teams[df_teams['Name']==player].index.values[0]

            # getting the 'Overall', 'Potential', and 'Field Position Num'
            p_overall = df_teams.iloc[input_player_index]['Overall']
            p_potential = df_teams.iloc[input_player_index]['Potential']
            p_position = df_teams.iloc[input_player_index]['FieldPositionNum']

            # getting 'Wage' for player in 'df_teams' DF
            # to be used later for 'Post-trade Leftover Wage' in returned DF
            input_player_wage = df_teams.iloc[input_player_index]['Wage']
            players_wages.append(input_player_wage)

            # getting 'row' for same player in 'df_attributes' using index (No 'Name' col in 'df_attributes')
            player_attributes = df_attributes.iloc[input_player_index]

            # filtering attributes logic:
            filtered_attributes = df_attributes[(df_attributes['Overall'] > p_overall-10) 
                                            & (df_attributes['Potential'] > p_potential-10)
                                            & (df_attributes['FieldPositionNum'] == p_position)]

            # use filter logic to suggest replacement players - top 5 suggested
            # gives DF of with all indexes and correlation ratio
            suggested_players = filtered_attributes.corrwith(player_attributes, axis=1)

            # Top 2 suggested players (most positively correlated)
            suggested_players = suggested_players.sort_values(ascending=False).head(6)

            cols = ['Name', 'Position', 'OvervalueRatio', 'Overall', 'Potential', 'Wage']
            for i, corr in enumerate(suggested_players):
                if idx == 0:
                    # player 1 - suggested trades
                    trades_p1.append(data[data.index==suggested_players.index[i]][cols].values)
                else:
                    # player 2 - suggested trades                 
                    trades_p2.append(data[data.index==suggested_players.index[i]][cols].values)

        cols1 = ['Name', 'Position', 'OvervalueRatio', 'Overall', 'Potential', 'Wage']
        # suggested trades DF for player 1 - dropping 1st row (most positively correlated = same as player 1)
        trades_p1_df = pd.DataFrame(np.row_stack(trades_p1), columns=cols1)
        trades_p1_df = trades_p1_df.drop(trades_p1_df.index[0]).reset_index(drop=True)
        
        # suggested trades DF for player 2 - dropping 1st row (most positively correlated = same as player 2)
        trades_p2_df = pd.DataFrame(np.row_stack(trades_p2), columns=cols1)
        trades_p2_df = trades_p2_df.drop(trades_p2_df.index[0]).reset_index(drop=True)
        
        #adding 'Post-trade Leftover Wage' column to each returned DF
        trades_p1_df['Post-tradeLeftoverWage'] = players_wages[0] - trades_p1_df['Wage']
        trades_p2_df['Post-tradeLeftoverWage'] = players_wages[1] - trades_p2_df['Wage']
        
        return top_2, bottom_2, trades_p1_df, trades_p2_df

    # See comment line inside of function just below
    def get_replacement_players(df_teams):
        '''Gets 2 lowest-rated players, and suggests four possible replacements.'''
        replacements_p1 = []  # this will be the output object that club_suggested_changes receives/uses
        replacements_p2 = []
        players_wages = []

        
        all_players, top_2, bottom_2 = get_club_players(df_teams)  # df_club_list, df_top_2_players, df_bottom_2_players

        # looping throught 2 player names in 'top_2'
        for idx, player in enumerate(bottom_2.Name):

            # getting 'index' for player in 'df_teams' DF
            input_player_index = df_teams[df_teams['Name']==player].index.values[0]

            # getting the 'Overall', 'Potential', and 'Field Position Num'
            p_overall = df_teams.iloc[input_player_index]['Overall']
            p_potential = df_teams.iloc[input_player_index]['Potential']
            p_position = df_teams.iloc[input_player_index]['FieldPositionNum']

            # getting 'Wage' for player in 'df_teams' DF
            # to be used later for 'Post-trade Leftover Wage' in returned DF
            input_player_wage = df_teams.iloc[input_player_index]['Wage']
            players_wages.append(input_player_wage)

            # getting 'row' for same player in 'df_attributes' using index (No 'Name' col in 'df_attributes')
            player_attributes = df_attributes.iloc[input_player_index]

            # filtering weak attributes logic:
            filtered_weak_attributes = df_attributes[(df_attributes['Overall'] < 90) 
                                                    & (df_attributes['Potential'] > p_potential)
                                                    & (df_attributes['Potential'] < 89)
                                                    & (df_attributes['FieldPositionNum'] == p_position)]

            suggested_players = filtered_weak_attributes.corrwith(player_attributes, axis=1)
            suggested_players = suggested_players.sort_values(ascending=False).head(3)

            cols = ['Name', 'Position', 'OvervalueRatio', 'Overall', 'Potential', 'Wage']
            for i, corr in enumerate(suggested_players):
                if idx == 0:
                    # player 1 - suggested replacements
                    replacements_p1.append(data[data.index==suggested_players.index[i]][cols].values)
                else:
                    # player 2 - suggested replacements                 
                    replacements_p2.append(data[data.index==suggested_players.index[i]][cols].values)

        cols1 = ['Name', 'Position', 'OvervalueRatio', 'OverallRating', 'PotentialRating', 'Wage']
        
        # suggested replacements DF for player 1 - dropping 1st row (most positively correlated = same as player 1)
        replacements_p1_df = pd.DataFrame(np.row_stack(replacements_p1), columns=cols1)
        replacements_p1_df = replacements_p1_df.drop(replacements_p1_df.index[0]).reset_index(drop=True)
        
        # suggested replacements DF for player 2 - dropping 1st row (most positively correlated = same as player 2)
        replacements_p2_df = pd.DataFrame(np.row_stack(replacements_p2), columns=cols1)
        replacements_p2_df = replacements_p2_df.drop(replacements_p2_df.index[0]).reset_index(drop=True)
        
        #adding 'Post-trade Leftover Wage' column to each returned DF
        replacements_p1_df['Post-tradeLeftoverWage'] = players_wages[0] - replacements_p1_df['Wage']
        replacements_p2_df['Post-tradeLeftoverWage'] = players_wages[1] - replacements_p2_df['Wage']
        
        return replacements_p1_df, replacements_p2_df

        # All tables
        allplayers, top2overvalued, bottom2weak = get_club_players(df_teams)
        top_2, bottom_2, trades_p1_df, trades_p2_df = get_suggested_trades(df_teams)
        replacements_p1_df, replacements_p2_df = get_replacement_players(df_teams)

        # turning all tables into JSON
        top_2 = top_2.to_json(orient='records')
        bottom_2 = bottom_2.to_json(orient='records')
        trades_p1_df = trades_p1_df.to_json(orient='records')
        trades_p2_df = trades_p2_df.to_json(orient='records')
        replacements_p1_df = replacements_p1_df.to_json(orient='records')
        replacements_p2_df = replacements_p2_df.to_json(orient='records')


    def all_dfs_json():
        json_dict = dict({'top2overvalued': top_2,
                        'suggestedtrades' : [trades_p1_df, trades_p2_df], 
                        'bottom2weak': bottom_2,
                        'suggestedreplacements': [replacements_p1_df, replacements_p2_df]})
        return json.dumps(json_dict)

    print(all_dfs_json());
    sys.stdout.flush();


#start process
if __name__ == '__main__':
    main()
