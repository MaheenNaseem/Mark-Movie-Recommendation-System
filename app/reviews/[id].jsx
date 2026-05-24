import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../constants/colors";
import { useReviewMutation } from "../../hooks/useReviewMutation";
import {
  addReview,
  deleteReview,
  updateReview,
} from "../../store/slices/reviewslice";

export default function ReviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  // for setting the theme according colors for the app
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = getTheme(isDark);

  const reviews = useSelector((state) =>
    state.reviews.reviews.filter((r) => r.movieId === Number(id)),
  );

  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [editingId, setEditingId] = useState(null);

  const mutation = useReviewMutation();

  // populates the fields and save the review which is being updated
  const handleEditReview = (review) => {
    setText(review.text);
    setRating(review.rating.toString());
    setEditingId(review.id);
  };

  const handleAddReview = () => {
    // if empty
    if (!text || !rating) return;

    // if there is an editing id then saves the changed in updated
    if (editingId) {
      const updated = {
        id: editingId,
        movieId: Number(id),
        text,
        rating,
      };
      dispatch(updateReview(updated));
      setText("");
      setRating("");
      setEditingId(null);
      return;
    }

    const review = {
      id: Date.now(),
      movieId: Number(id),
      text,
      rating,
    };

    mutation.mutate(review, {
      onSuccess: () => {
        dispatch(addReview(review));
        setText("");
        setRating("");
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backBtn, { backgroundColor: colors.secondary }]}
      >
        <Text style={[styles.backBtnText, { color: colors.white }]}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={[styles.heading, { color: colors.highlight }]}>Reviews</Text>

      <TextInput
        placeholder="Write review..."
        placeholderTextColor="#aaa"
        value={text}
        onChangeText={setText}
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.white },
        ]}
      />

      <TextInput
        placeholder="Rating (1-10)"
        placeholderTextColor="#aaa"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.white },
        ]}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleAddReview}
      >
        {/* checks if teh editing id is true then shows save edit text else the others*/}
        <Text style={styles.buttonText}>
          {editingId
            ? "Save Edit"
            : mutation.isPending
              ? "Adding..."
              : "Add Review"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.reviewCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.reviewText, { color: colors.white }]}>
              ⭐ {item.rating}
            </Text>

            <Text style={[styles.reviewText, { color: colors.white }]}>
              {item.text}
            </Text>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity onPress={() => handleEditReview(item)}>
                <Text style={[styles.update, { color: colors.update }]}>
                  Update
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => dispatch(deleteReview(item.id))}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 60,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 50,
  },

  input: {
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  reviewCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  reviewText: {
    marginBottom: 5,
  },

  delete: {
    color: "red",
    marginTop: 5,
    paddingRight: 20,
  },
  update: {
    marginTop: 5,
    paddingRight: 20,
  },
  backBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 10,
    padding: 10,
    marginTop: 50,
  },
  backBtnText: {
    fontWeight: "Bold",
  },
});
