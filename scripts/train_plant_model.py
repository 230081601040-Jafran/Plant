import os
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV3Large
from tensorflow.keras import layers, models
import tensorflowjs as tfjs

# -------------------------------------------------------------
# FloraVision AI - Kaggle Plant Disease Model Trainer
# Dataset: "New Plant Diseases Dataset (Augmented)" (87,000 images, 38 classes)
# -------------------------------------------------------------

DATASET_DIR = "./dataset/New Plant Diseases Dataset(Augmented)/train"
MODEL_OUTPUT_DIR = "../public/model"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10

def main():
    print("🚀 Starting FloraVision AI Custom Model Training...")

    # 1. Load Dataset from folder
    train_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    class_names = train_ds.class_names
    print(f"✅ Found {len(class_names)} Plant & Disease Classes:")
    for i, c in enumerate(class_names):
        print(f"  {i+1}. {c}")

    # Optimize pipeline speed
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

    # 2. Transfer Learning using MobileNetV3 (Lightweight & high accuracy for web)
    base_model = MobileNetV3Large(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False

    # 3. Custom Classifier Head
    model = models.Sequential([
        layers.Rescaling(1./255),
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(256, activation='relu'),
        layers.Dense(len(class_names), activation='softmax')
    ])

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    # 4. Train Model
    print("⚡ Training model...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS
    )

    # 5. Save H5 checkpoint
    os.makedirs(MODEL_OUTPUT_DIR, exist_ok=True)
    h5_path = os.path.join(MODEL_OUTPUT_DIR, "plant_model.h5")
    model.save(h5_path)
    print(f"💾 Saved H5 Checkpoint to {h5_path}")

    # 6. Convert to TensorFlow.js for the Browser!
    print("🌐 Converting model to TensorFlow.js format...")
    tfjs.converters.save_keras_model(model, MODEL_OUTPUT_DIR)
    print(f"🎉 SUCCESS! Web model exported to '{MODEL_OUTPUT_DIR}/model.json'")

if __name__ == "__main__":
    main()
