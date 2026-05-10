from db.utils import *

def get_video_and_audio_with_transcription(conn):
    query = """
        select content.created_at,
            description,
            file_url,
            quality_score,
            topic,
            type,
            dialect_id,
            original_file_name,
            text
        from content
        join transcription on content.id = transcription.content_id""" # get only the videos and audios that have transcription

    df = pd.read_sql(query, conn)

    return df