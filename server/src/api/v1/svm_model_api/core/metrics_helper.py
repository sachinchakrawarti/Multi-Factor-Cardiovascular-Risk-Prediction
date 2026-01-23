from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix
)


def generate_binary_metrics(
    y_true,
    y_pred,
    y_prob,
    model_name: str
):
    """
    Generate unified metrics for binary classification models.
    Used by ALL models (SVM, DT, RF, LR, KNN, ANN, Hybrid)
    """

    cm = confusion_matrix(y_true, y_pred)

    # Safe unpacking
    if cm.shape == (2, 2):
        tn, fp, fn, tp = cm.ravel()
    else:
        tn = fp = fn = tp = 0

    metrics = {
        "model_name": model_name,

        # Core performance
        "accuracy": round(float(accuracy_score(y_true, y_pred)), 4),
        "precision": round(float(precision_score(y_true, y_pred, zero_division=0)), 4),
        "recall": round(float(recall_score(y_true, y_pred, zero_division=0)), 4),
        "f1_score": round(float(f1_score(y_true, y_pred, zero_division=0)), 4),

        # Probability-based metric
        "roc_auc": round(float(roc_auc_score(y_true, y_prob)), 4),

        # Confusion matrix values
        "true_positive": int(tp),
        "true_negative": int(tn),
        "false_positive": int(fp),
        "false_negative": int(fn),

        # Extra info
        "confusion_matrix": cm.tolist(),
        "support": int(len(y_true))
    }

    return metrics
